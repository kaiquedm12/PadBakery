import React, { useEffect, useState } from 'react';
import { saleService } from '../services/firestoreService';
import { FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import './Caixa.css';

const formasPagamento = ['Dinheiro', 'Cartão', 'Pix', 'Outros'];

export default function Caixa() {
  const [valor, setValor] = useState('');
  const [recebido, setRecebido] = useState('');
  const [troco, setTroco] = useState('');
  const [forma, setForma] = useState('Dinheiro');
  const [msg, setMsg] = useState('');
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVendas() {
      setLoading(true);
      const res = await saleService.getSalesByPeriod(new Date('2000-01-01'), new Date());
      if (res.success) setVendas(res.sales);
      setLoading(false);
    }
    fetchVendas();
  }, []);

  function calcularTroco(valor, recebido) {
    const v = parseFloat(valor) || 0;
    const r = parseFloat(recebido) || 0;
    return r > v ? (r - v).toFixed(2) : '0.00';
  }

  function handleRecebido(e) {
    setRecebido(e.target.value);
    setTroco(calcularTroco(valor, e.target.value));
  }

  async function handleFinalizar(e) {
    e.preventDefault();
    if (!valor || !recebido || parseFloat(recebido) < parseFloat(valor)) {
      setMsg('Valor recebido insuficiente.');
      return;
    }
    setLoading(true);
    await saleService.registerSale({ valor, recebido, troco, forma, data: new Date() });
    setMsg('Venda registrada com sucesso!');
    setValor(''); setRecebido(''); setTroco(''); setForma('Dinheiro');
    setTimeout(() => setMsg(''), 2000);
    const res = await saleService.getSalesByPeriod(new Date('2000-01-01'), new Date());
    if (res.success) setVendas(res.sales);
    setLoading(false);
  }

  // Gráfico simples de vendas por dia
  const vendasPorDia = vendas.reduce((acc, venda) => {
    const dia = new Date(venda.createdAt?.seconds ? venda.createdAt.seconds * 1000 : venda.createdAt).toLocaleDateString();
    acc[dia] = (acc[dia] || 0) + parseFloat(venda.valor || 0);
    return acc;
  }, {});

  return (
    <div className="caixa-root">
      <h2 className="caixa-title">Caixa</h2>
      <form className="caixa-form" onSubmit={handleFinalizar}>
        <div className="form-row">
          <input type="number" min="0" step="0.01" placeholder="Valor da venda*" value={valor} onChange={e => { setValor(e.target.value); setTroco(calcularTroco(e.target.value, recebido)); }} />
          <input type="number" min="0" step="0.01" placeholder="Valor recebido*" value={recebido} onChange={handleRecebido} />
          <input type="text" placeholder="Troco" value={troco} readOnly />
          <select value={forma} onChange={e => setForma(e.target.value)}>
            {formasPagamento.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <button className="form-btn" type="submit" disabled={loading}>
          <FiDollarSign /> Finalizar Venda
        </button>
        {msg && <div className="caixa-msg">{msg}</div>}
      </form>
      <div className="caixa-relatorio">
        <h3>Relatório de Vendas</h3>
        <table className="caixa-tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Recebido</th>
              <th>Troco</th>
              <th>Forma</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v, i) => (
              <tr key={i}>
                <td>{new Date(v.createdAt?.seconds ? v.createdAt.seconds * 1000 : v.createdAt).toLocaleString()}</td>
                <td>R$ {parseFloat(v.valor).toFixed(2)}</td>
                <td>R$ {parseFloat(v.recebido).toFixed(2)}</td>
                <td>R$ {parseFloat(v.troco).toFixed(2)}</td>
                <td>{v.forma}</td>
              </tr>
            ))}
            {vendas.length === 0 && <tr><td colSpan={5} className="caixa-vazio">Nenhuma venda registrada.</td></tr>}
          </tbody>
        </table>
        <div className="caixa-grafico">
          <h4><FiBarChart2 /> Vendas por Dia</h4>
          <div className="grafico-barras">
            {Object.entries(vendasPorDia).map(([dia, total]) => (
              <div key={dia} className="barra-dia">
                <div className="barra" style={{ height: `${Math.min(total * 2, 120)}px` }} title={`R$ ${total.toFixed(2)}`}></div>
                <span className="barra-label">{dia}</span>
              </div>
            ))}
            {Object.keys(vendasPorDia).length === 0 && <div className="grafico-vazio">Sem dados</div>}
          </div>
        </div>
      </div>
    </div>
  );
} 
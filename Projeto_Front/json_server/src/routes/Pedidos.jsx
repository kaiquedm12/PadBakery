import React, { useEffect, useState } from 'react';
import { productService } from '../services/firestoreService';
import { FiSearch, FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import './Pedidos.css';

export default function Pedidos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [pedido, setPedido] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchProdutos() {
      const res = await productService.getProducts();
      if (res.success) setProdutos(res.products);
    }
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (busca.length > 0) {
      setSugestoes(produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase())));
    } else {
      setSugestoes([]);
    }
  }, [busca, produtos]);

  function handleSelecionar(prod) {
    setSelecionado(prod);
    setBusca(prod.nome);
    setSugestoes([]);
    setQuantidade(1);
  }

  function handleAdicionar() {
    if (!selecionado || quantidade < 1) return;
    const jaNoPedido = pedido.find(item => item.id === selecionado.id);
    if (jaNoPedido) {
      setPedido(pedido.map(item => item.id === selecionado.id ? { ...item, quantidade: item.quantidade + quantidade } : item));
    } else {
      setPedido([...pedido, { ...selecionado, quantidade }]);
    }
    setSelecionado(null);
    setBusca('');
    setQuantidade(1);
  }

  function handleRemover(id) {
    setPedido(pedido.filter(item => item.id !== id));
  }

  function totalPedido() {
    return pedido.reduce((acc, item) => acc + Number(item.preco) * item.quantidade, 0);
  }

  function finalizarPedido() {
    setMsg('Pedido finalizado! (Integração com caixa em breve)');
    setPedido([]);
    setTimeout(() => setMsg(''), 2500);
  }

  return (
    <div className="pedidos-root">
      <h2 className="pedidos-title">Pedidos</h2>
      <div className="pedidos-form">
        <div className="autocomplete">
          <FiSearch className="autocomplete-icon" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={e => { setBusca(e.target.value); setSelecionado(null); }}
            autoComplete="off"
          />
          {sugestoes.length > 0 && (
            <ul className="autocomplete-list">
              {sugestoes.map(prod => (
                <li key={prod.id} onClick={() => handleSelecionar(prod)}>
                  {prod.nome} <span className="sugestao-qtd">({prod.quantidade} em estoque)</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selecionado && (
          <div className="produto-detalhes">
            <div><b>Produto:</b> {selecionado.nome}</div>
            <div><b>Preço:</b> R$ {Number(selecionado.preco).toFixed(2)}</div>
            <div><b>Disponível:</b> {selecionado.quantidade}</div>
            <div className="qtd-adicionar">
              <label>Qtd:</label>
              <input type="number" min="1" max={selecionado.quantidade} value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />
              <button className="add-btn" onClick={handleAdicionar} disabled={quantidade < 1 || quantidade > selecionado.quantidade}>
                <FiPlus /> Adicionar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="pedido-lista">
        <h3>Itens do Pedido</h3>
        {pedido.length === 0 ? (
          <div className="pedido-vazio">Nenhum produto adicionado.</div>
        ) : (
          <table className="pedido-tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pedido.map(item => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {Number(item.preco).toFixed(2)}</td>
                  <td>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button className="icon-btn" title="Remover" onClick={() => handleRemover(item.id)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="pedido-total">
          <span>Total:</span>
          <span className="pedido-total-valor">R$ {totalPedido().toFixed(2)}</span>
        </div>
        <button className="finalizar-btn" onClick={finalizarPedido} disabled={pedido.length === 0}>
          <FiCheckCircle /> Finalizar Pedido
        </button>
        {msg && <div className="pedido-msg">{msg}</div>}
      </div>
    </div>
  );
} 
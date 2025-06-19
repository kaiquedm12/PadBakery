import React, { useEffect, useState } from 'react';
import { productService, purchaseService } from '../services/firestoreService';
import { FiShoppingBag, FiRefreshCw } from 'react-icons/fi';
import './Compras.css';

const LIMITE_ESTOQUE_BAIXO = 5;

export default function Compras() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function carregarProdutos() {
    setLoading(true);
    const res = await productService.getProducts();
    if (res.success) setProdutos(res.products);
    setLoading(false);
  }

  useEffect(() => { carregarProdutos(); }, []);

  async function handleRecompra(prod) {
    setLoading(true);
    await purchaseService.registerPurchase({ produtoId: prod.id, nome: prod.nome, status: 'pending', data: new Date() });
    setMsg(`Recompra registrada para "${prod.nome}"!`);
    setTimeout(() => setMsg(''), 2000);
    setLoading(false);
  }

  const produtosBaixoEstoque = produtos.filter(p => Number(p.quantidade) <= LIMITE_ESTOQUE_BAIXO);

  return (
    <div className="compras-root">
      <h2 className="compras-title">Compras</h2>
      <div className="compras-info">Produtos com estoque baixo ou zerado</div>
      {msg && <div className="compras-msg">{msg}</div>}
      <div className="compras-lista">
        {loading ? <div className="compras-loading">Carregando...</div> : (
          <table className="compras-tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Qtd Atual</th>
                <th>Recompra</th>
              </tr>
            </thead>
            <tbody>
              {produtosBaixoEstoque.length === 0 && (
                <tr><td colSpan={4} className="compras-vazio">Nenhum produto com estoque baixo.</td></tr>
              )}
              {produtosBaixoEstoque.map(prod => (
                <tr key={prod.id} className={Number(prod.quantidade) === 0 ? 'zerado' : ''}>
                  <td>{prod.nome}</td>
                  <td>{prod.categoria}</td>
                  <td>{prod.quantidade}</td>
                  <td>
                    <button className="recompra-btn" onClick={() => handleRecompra(prod)} disabled={loading}>
                      <FiRefreshCw /> Recomprar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 
import React, { useEffect, useState } from 'react';
import { productService } from '../services/firestoreService';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './Estoque.css';

const categorias = [
  'Pães', 'Doces', 'Bolos', 'Salgados', 'Bebidas', 'Outros'
];

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', categoria: '', preco: '', quantidade: '', descricao: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function carregarProdutos() {
    setLoading(true);
    const res = await productService.getProducts();
    if (res.success) setProdutos(res.products);
    setLoading(false);
  }

  useEffect(() => { carregarProdutos(); }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    if (!form.nome || !form.categoria || !form.preco || !form.quantidade) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    if (editId) {
      await productService.updateProduct(editId, form);
    } else {
      await productService.addProduct(form);
    }
    setForm({ nome: '', categoria: '', preco: '', quantidade: '', descricao: '' });
    setEditId(null);
    setLoading(false);
    carregarProdutos();
  }

  function handleEdit(prod) {
    setForm({
      nome: prod.nome,
      categoria: prod.categoria,
      preco: prod.preco,
      quantidade: prod.quantidade,
      descricao: prod.descricao || ''
    });
    setEditId(prod.id);
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja excluir este produto?')) {
      setLoading(true);
      await productService.deleteProduct(id);
      setLoading(false);
      carregarProdutos();
    }
  }

  return (
    <div className="estoque-root">
      <h2 className="estoque-title">Estoque</h2>
      <form className="estoque-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do produto*" />
          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">Categoria*</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-row">
          <input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço*" type="number" min="0" step="0.01" />
          <input name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Quantidade*" type="number" min="0" />
        </div>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição (opcional)" rows={2} />
        {erro && <div className="form-erro">{erro}</div>}
        <button className="form-btn" type="submit" disabled={loading}>
          <FiPlus /> {editId ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </form>
      <div className="estoque-lista">
        {loading ? <div className="estoque-loading">Carregando...</div> : (
          <table className="estoque-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Qtd</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.nome}</td>
                  <td>{prod.categoria}</td>
                  <td>R$ {Number(prod.preco).toFixed(2)}</td>
                  <td>{prod.quantidade}</td>
                  <td>
                    <button className="icon-btn" title="Editar" onClick={() => handleEdit(prod)}><FiEdit2 /></button>
                    <button className="icon-btn" title="Excluir" onClick={() => handleDelete(prod.id)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {produtos.length === 0 && (
                <tr><td colSpan={5} className="estoque-vazio">Nenhum produto cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 
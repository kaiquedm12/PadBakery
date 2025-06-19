import React from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiShoppingCart, FiDollarSign, FiTruck } from 'react-icons/fi';
import './Home.css';

export default function Home() {
  return (
    <div className="home-root">
      <div className="home-content">
        <h1 className="home-title">Bem-vindo ao <span>PadBakery</span></h1>
        <p className="home-subtitle">Gestão moderna, rápida e intuitiva para sua padaria.</p>
        <div className="home-actions">
          <Link to="/estoque" className="home-action">
            <FiBox />
            <span>Estoque</span>
          </Link>
          <Link to="/pedidos" className="home-action">
            <FiShoppingCart />
            <span>Pedidos</span>
          </Link>
          <Link to="/caixa" className="home-action">
            <FiDollarSign />
            <span>Caixa</span>
          </Link>
          <Link to="/compras" className="home-action">
            <FiTruck />
            <span>Compras</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBox, FiShoppingCart, FiDollarSign, FiTruck, FiHome, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/Auth';
import './Layout.css';

const menu = [
  { label: 'Home', path: '/', icon: <FiHome /> },
  { label: 'Estoque', path: '/estoque', icon: <FiBox /> },
  { label: 'Pedidos', path: '/pedidos', icon: <FiShoppingCart /> },
  { label: 'Caixa', path: '/caixa', icon: <FiDollarSign /> },
  { label: 'Compras', path: '/compras', icon: <FiTruck /> },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">PadBakery</span>
        </div>
        <nav className="sidebar-menu">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link${location.pathname === item.path ? ' active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        {user && (
          <div className="sidebar-footer">
            <span className="sidebar-user">{user.displayName || user.email}</span>
            <button className="sidebar-logout" onClick={logout} title="Sair">
              <FiLogOut />
            </button>
          </div>
        )}
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
} 
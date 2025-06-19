import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

const RotaProtegida = ({ children }) => {
  const { user, loading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" />
  }

  return children
};

export default RotaProtegida
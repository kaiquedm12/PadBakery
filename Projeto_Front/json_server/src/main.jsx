import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Signup from './routes/Signup.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RotaProtegida from './components/RotaProtegida.jsx'
import { AuthProvider } from './context/Auth'
import Error from './routes/Error.jsx'
import Estoque from './routes/Estoque.jsx'
import Pedidos from './routes/Pedidos.jsx'
import Caixa from './routes/Caixa.jsx'
import Compras from './routes/Compras.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home /> //Definindo Home como rota inicial
      },
      {
        path: 'home',
        element: <Home />, //Rota para a tela Home
      },
      {
        path: 'login',
        element: <Login />,//Rota para a tela de Login
      },
      {
        path: 'signup',
        element: <Signup />, //Rota para a tela de Cadastro
      },
      {
        path: 'estoque',
        element: (
          <RotaProtegida>
            <Estoque/>
          </RotaProtegida>
        )
      },
      {
        path: 'pedidos',
        element: (
          <RotaProtegida>
            <Pedidos/>
          </RotaProtegida>
        )
      },
      {
        path: 'caixa',
        element: (
          <RotaProtegida>
            <Caixa/>
          </RotaProtegida>
        )
      },
      {
        path: 'compras',
        element: (
          <RotaProtegida>
            <Compras/>
          </RotaProtegida>
        )
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

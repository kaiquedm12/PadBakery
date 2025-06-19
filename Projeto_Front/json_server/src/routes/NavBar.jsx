import './NavBar.css'
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useAuth } from '../context/Auth';

export default function NavBar(){
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            console.log("Usuário deslogado")
        } else {
            console.error("Erro ao fazer logout:", result.error)
        }
    }

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null
    }

    return(
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to='/'>
                    <img src='public\images\logo.jpeg' alt='Inicio' className='navbar-logo' />
                </Link>
            </div>
            <div className='navbar-right'>
                {user ? (
                    <>
                        <Link to="/estoque" className="nav-link">Estoque</Link>
                        <Link to="/pedidos" className="nav-link">Pedidos</Link>
                        <Link to="/caixa" className="nav-link">Caixa</Link>
                        <Link to="/compras" className="nav-link">Compras</Link>
                        <div className="user-info">
                            <span>Olá, {user.displayName || user.email}</span>
                            <button onClick={handleLogout} className="logout-button">
                                Sair
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to='/signup' className='nav-link'>Cadastrar</Link>
                        <Link to='/login' className='nav-link'>Login</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()

  const handleVoltarRedirect = () => {
    navigate('/')
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      setLoading(false)
      return
    }

    const result = await login(email, password)
    
    if (result.success) {
      console.log("Usuário logado:", result.user)
      navigate('/product-table')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    const result = await loginWithGoogle()
    
    if (result.success) {
      console.log("Usuário logado com Google:", result.user)
      navigate('/product-table')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className='login-container'>
      <h2>Fazer Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleEmailLogin}>
        <label className='form-label' htmlFor="email">Email</label>
        <input 
          className='form-input' 
          value={email} 
          type="email" 
          name="email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          disabled={loading}
        />
        
        <label className='form-label' htmlFor="senha">Senha</label>
        <input 
          className='form-input' 
          value={password} 
          type="password" 
          name="senha" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          disabled={loading}
        />
        
        <button 
          className='form-submit' 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="divider">
        <span>ou</span>
      </div>

      <button 
        className='google-login-button' 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {loading ? 'Entrando...' : 'Entrar com Google'}
      </button>

      <button 
        className='voltar-redirect-button' 
        onClick={handleVoltarRedirect}
        disabled={loading}
      >
        Voltar
      </button>
      
      <Link to='/signup' className='signup-text-link'>Não tem uma conta? Cadastre-se</Link>
    </div>
  )
}
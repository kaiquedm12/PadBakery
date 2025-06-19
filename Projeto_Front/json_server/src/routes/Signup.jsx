import { useState } from 'react'
import './Signup.css'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    const result = await signup(email, password, name)
    
    if (result.success) {
      console.log("Usuário cadastrado:", result.user)
      navigate('/product-table')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleVoltarRedirect = () => {
    navigate('/')
  }

  return (
    <div className='signup-container'>
      <h2>Criar Conta</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSignup}>
        <label className='form-label' htmlFor="name">Nome</label>
        <input 
          className='form-input' 
          value={name} 
          type="text" 
          name="name" 
          onChange={(e) => setName(e.target.value)} 
          required 
          disabled={loading}
        />
        
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
        
        <label className='form-label' htmlFor="confirmSenha">Confirmar Senha</label>
        <input 
          className='form-input' 
          value={confirmPassword} 
          type="password" 
          name="confirmSenha" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
          disabled={loading}
        />
        
        <button 
          className='form-submit' 
          type='submit' 
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      
      <button 
        className='voltar-redirect-button' 
        onClick={handleVoltarRedirect}
        disabled={loading}
      >
        Voltar
      </button>
      
      <Link to='/login' className='signup-text-link'>Já tem uma conta? Entre</Link>
    </div>
  );
}

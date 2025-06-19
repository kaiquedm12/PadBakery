import './App.css'
import NavBar from './routes/NavBar'
import Footer from './routes/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import './routes/Login.css'
import './routes/Signup.css'
import Layout from './components/Layout'

export default function App() {  
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  
  return (
    <>
      {isAuthPage ? (
        <div className="auth-content">
          <Outlet />
        </div>
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
      {location.pathname !== '/login' && <Footer />}
    </>
  )
}
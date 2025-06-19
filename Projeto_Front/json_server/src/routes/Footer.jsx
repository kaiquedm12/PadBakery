import './Footer.css'
import { useLocation } from "react-router-dom"
import { FiCoffee } from 'react-icons/fi';

export default function Footer() {
  const location = useLocation()

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null
    }

  return (
    <footer className="footer">
      <FiCoffee style={{ verticalAlign: 'middle', marginRight: 6, fontSize: '1.1em' }} />
      PadBakery &copy; 2025. Todos os direitos reservados.
    </footer>
  );
}

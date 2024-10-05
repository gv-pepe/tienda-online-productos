import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Importa ambos íconos
import logo from '../clogo.png'; // Asegúrate de importar tu logo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar la apertura del menú
  const [headerHover, setHeaderHover] = useState(false); // Estado para el hover del encabezado

  return (
    <header 
      className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-700 ${headerHover || menuOpen ? 'bg-white' : 'bg-transparent'}`} 
      onMouseEnter={() => setHeaderHover(true)} 
      onMouseLeave={() => setHeaderHover(false)}
    >
      <div className="flex items-center justify-between mb-4 mx-4">
        {/* Logo a la izquierda con margen izquierdo */}
        <img src={logo} alt="Logo" className="h-12 ml-5" />

        {/* Icono del menú, cambia entre hamburguesa y X */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú vertical que aparece sobre el contenido */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 flex flex-col items-center py-4">
          <button className="text-gray-600 hover:text-gray-900 text-lg mb-2">Contáctame</button>
          <button className="text-gray-600 hover:text-gray-900 text-lg mb-2">Sobre mí</button>
          <button className="text-gray-600 hover:text-gray-900 text-lg">Productos</button>
        </nav>
      )}
    </header>
  );
};

export default Header;

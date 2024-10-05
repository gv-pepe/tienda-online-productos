import { Search, ShoppingCart } from 'lucide-react';
import CategorySelector from './CategorySelector'; // Asegúrate de importar el selector de categoría

const Header = ({ setBusqueda, busqueda, setCarritoAbierto, carrito, setCategoriaSeleccionada }) => (
  <header className="py-4 mb-8">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Mi Tienda Online</h1>
      <button 
        onClick={() => setCarritoAbierto(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <ShoppingCart className="h-6 w-6" />
        {carrito.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {carrito.reduce((total, item) => total + item.cantidad, 0)}
          </span>
        )}
      </button>
    </div>
    
    <div className="flex items-center space-x-4"> {/* Espacio entre los elementos */}
      {/* Selector de categoría */}
      <CategorySelector 
        categorias={["Todas","Categoría 1", "Categoría 2", "Categoría 3"]} 
        setCategoriaSeleccionada={setCategoriaSeleccionada} 
      />
      
      {/* Buscador */}
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 pl-10 border rounded-md"
        />
      </div>
    </div>
  </header>
);

export default Header;

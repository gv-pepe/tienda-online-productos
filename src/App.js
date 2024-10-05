import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [mostrarImagen, setMostrarImagen] = useState(false); // Initialize as false
  const [mostrarApp, setMostrarApp] = useState(false); // New state to control app display

  // Function to fetch products from the server
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://192.168.1.67:5000/api/productos');
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProductos();
      setMostrarImagen(true); // Show image after authentication
    }
  }, [isAuthenticated]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item._id === producto._id);
    if (existe) {
      setCarrito(
        carrito.map(item =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito(carrito.map(item =>
      item._id === id
        ? { ...item, cantidad: Math.max(item.cantidad + cantidad, 0) }
        : item
    ).filter(item => item.cantidad > 0));
  };

  const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada)
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  const handleContinue = () => {
    setMostrarApp(true); // Show the main app after clicking "Continuar"
  };

  return (
    <div className="container mx-auto px-4">
      {!isAuthenticated ? (
        isRegistering ? (
          <Register onRegister={handleLogin} onSwitchToLogin={handleSwitchToLogin} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
        )
      ) : (
        <>
          {mostrarImagen && !mostrarApp && ( // Show the image and button only if mostrarApp is false
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <img 
                src="https://editorialtelevisa.brightspotcdn.com/dims4/default/c29de63/2147483647/strip/true/crop/1200x676+0+12/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2F82%2F67%2Fe8c7d5004f948952b20f8ea3d24f%2Fpaletas-de-hielo-frutas.jpg" 
                alt="Imagen de fondo" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute text-center">
                <h1 className="text-5xl font-bold text-black">Nombre del Negocio</h1>
                <p className="mt-2 text-lg text-black">Información sobre el negocio aquí.</p>
                <button 
                  className="mt-4 bg-blue-500 text-white py-2 px-6 rounded transition duration-300 hover:bg-blue-600"
                  onClick={handleContinue} // Call handleContinue on button click
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {mostrarApp && ( // Show the main app content when mostrarApp is true
            <div className={`transition-all duration-1000 ease-in-out`}>
              <Header 
                setBusqueda={setBusqueda} 
                busqueda={busqueda} 
                setCarritoAbierto={setCarritoAbierto} 
                carrito={carrito} 
                setCategoriaSeleccionada={setCategoriaSeleccionada} 
              />
              {loading ? <div>Cargando productos...</div> : error ? <div>Error: {error}</div> : (
                <>
                  <ProductList 
                    productos={productosFiltrados} 
                    onSelect={setProductoSeleccionado} 
                  />
                  {productoSeleccionado && (
                    <ProductModal
                      producto={productoSeleccionado}
                      onClose={() => setProductoSeleccionado(null)}
                      agregarAlCarrito={agregarAlCarrito}
                    />
                  )}
                  {carritoAbierto && (
                    <Cart
                      carrito={carrito}
                      setCarritoAbierto={setCarritoAbierto}
                      actualizarCantidad={actualizarCantidad}
                      totalCarrito={totalCarrito}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

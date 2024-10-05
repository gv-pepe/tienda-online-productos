import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import logo from './fondo.png';

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
  const [mostrarApp, setMostrarApp] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // To track current image

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
      setMostrarApp(true); // Show the app once authenticated
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Change the image every 5 seconds (slower transition)
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex < 7 ? prevIndex + 1 : 1)); // Loop back to 1 after 7
    }, 5000); // Changed to 5000ms for slower transition
    
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

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

  return (
    <div className="container mx-auto px-4">
      {/* Header fijo y encima de todo */}
      <Header 
        setBusqueda={setBusqueda} 
        busqueda={busqueda} 
        setCarritoAbierto={setCarritoAbierto} 
        carrito={carrito} 
        setCategoriaSeleccionada={setCategoriaSeleccionada} 
        className="fixed top-0 left-0 right-0 z-50 bg-white" // Fondo blanco y z-index alto
      />
      
      {/* Imagen de fondo del carrusel */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        {/* <img 
          src={`https://www.heladoslamichoacana.net/images/${currentImageIndex}.jpg`} 
          alt="Imagen de fondo" 
          className="w-full h-full object-cover transition duration-[1500ms]" // Establecer duración de transición a 1.5s
        /> */}
        <div className="absolute text-center">
        <img 
        src={logo} 
        alt="Logo" 
        className="w-[500px] mx-auto" // Aumentar tamaño del logo a 500 px
      />
        </div>
      </div>
  
      {/* Lista de productos justo debajo de la sección de imágenes */}
      {mostrarApp && (
        <div className={`transition-all duration-1000 ease-in-out mt-32 pt-24`}> {/* Ajustar margen superior para evitar superposición */}
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
    </div>
  );
  
  
};

export default App;

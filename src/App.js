import React, { useState } from 'react'
import { Search, ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react'

const productos = [
  { id: 1, nombre: "Camiseta", categoria: "Ropa", precio: 19.99, descuento: 10, imagen: "/placeholder.svg", descripcion: "Camiseta de algodón de alta calidad" },
  { id: 2, nombre: "Zapatillas", categoria: "Calzado", precio: 59.99, descuento: 0, imagen: "/placeholder.svg", descripcion: "Zapatillas deportivas con gran comodidad" },
  { id: 3, nombre: "Pantalón", categoria: "Ropa", precio: 39.99, descuento: 15, imagen: "/placeholder.svg", descripcion: "Pantalón elegante para ocasiones especiales" },
  { id: 4, nombre: "Reloj", categoria: "Accesorios", precio: 99.99, descuento: 5, imagen: "/placeholder.svg", descripcion: "Reloj de pulsera con diseño moderno" },
  { id: 5, nombre: "Bufanda", categoria: "Accesorios", precio: 24.99, descuento: 0, imagen: "/placeholder.svg", descripcion: "Bufanda suave y cálida para el invierno" },
  { id: 6, nombre: "Gorra", categoria: "Accesorios", precio: 14.99, descuento: 0, imagen: "/placeholder.svg", descripcion: "Gorra deportiva ajustable" },
]

const productosMasVendidos = [
  { id: 2, nombre: "Zapatillas", categoria: "Calzado", precio: 59.99, descuento: 0, imagen: "/placeholder.svg", descripcion: "Zapatillas deportivas con gran comodidad" },
  { id: 4, nombre: "Reloj", categoria: "Accesorios", precio: 99.99, descuento: 5, imagen: "/placeholder.svg", descripcion: "Reloj de pulsera con diseño moderno" },
  { id: 1, nombre: "Camiseta", categoria: "Ropa", precio: 19.99, descuento: 10, imagen: "/placeholder.svg", descripcion: "Camiseta de algodón de alta calidad" },
]

const categorias = ["Todas", "Ropa", "Calzado", "Accesorios"]

const App = ()  => {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  const productosFiltrados = productos.filter(producto => 
    (categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada) &&
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoEnCarrito = prevCarrito.find(item => item.id === producto.id)
      if (productoEnCarrito) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }]
    })
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.id === id ? { ...item, cantidad: Math.max(0, item.cantidad + cantidad) } : item
      ).filter(item => item.cantidad > 0)
    )
  }

  const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)

  return (
    <div className="container mx-auto px-4">
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
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="p-2 border rounded-md"
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
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

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Productos más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosMasVendidos.map(producto => (
            <div
              key={producto.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setProductoSeleccionado(producto)}
            >
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="font-semibold mb-2">{producto.nombre}</h3>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${producto.precio.toFixed(2)}</span>
                {producto.descuento > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {producto.descuento}% OFF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-4">Todos los productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.map(producto => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setProductoSeleccionado(producto)}
          >
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="font-semibold mb-2">{producto.nombre}</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${producto.precio.toFixed(2)}</span>
              {producto.descuento > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {producto.descuento}% OFF
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{productoSeleccionado.nombre}</h2>
              <button onClick={() => setProductoSeleccionado(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="w-full h-64 object-cover mb-4 rounded" />
            <p className="mb-2">{productoSeleccionado.descripcion}</p>
            <p className="mb-2">Categoría: {productoSeleccionado.categoria}</p>
            <p className="text-lg font-bold mb-2">Precio: ${productoSeleccionado.precio.toFixed(2)}</p>
            {productoSeleccionado.descuento > 0 && (
              <p className="text-red-500 mb-4">
                Descuento: {productoSeleccionado.descuento}% OFF
              </p>
            )}
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => setProductoSeleccionado(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  agregarAlCarrito(productoSeleccionado)
                  setProductoSeleccionado(null)
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {carritoAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Carrito de Compras</h2>
              <button onClick={() => setCarritoAbierto(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <div>
                {carrito.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center">
                      <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-semibold">{item.nombre}</h3>
                        <p className="text-sm text-gray-600">{item.descripcion}</p>
                        <p className="text-sm font-semibold">${item.precio.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => actualizarCantidad(item.id, -1)} className="p-1">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2">{item.cantidad}</span>
                      <button onClick={() => actualizarCantidad(item.id, 1)} className="p-1">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button onClick={() => actualizarCantidad(item.id, -item.cantidad)} className="p-1 ml-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="text-lg font-bold">Total: ${totalCarrito.toFixed(2)}</p>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Proceder al pago
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App;   
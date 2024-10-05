import { Minus, Plus, Trash2, X } from 'lucide-react';

const Cart = ({ carrito, setCarritoAbierto, actualizarCantidad, totalCarrito }) => (
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
);

export default Cart;

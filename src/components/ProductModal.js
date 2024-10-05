import { X } from 'lucide-react';

const ProductModal = ({ producto, onClose, agregarAlCarrito }) => (
  <div className="fixed inset-0 bg-prymary bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-prymary rounded-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{producto.nombre}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="mb-2">{producto.descripcion}</p>
      <p className="mb-2">Categoría: {producto.categoria}</p>
      <p className="text-lg font-bold mb-2">Precio: ${producto.precio.toFixed(2)}</p>
      {producto.descuento > 0 && (
        <p className="text-red-500 mb-4">Descuento: {producto.descuento}% OFF</p>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Cerrar
        </button>
        <button onClick={() => {
          agregarAlCarrito(producto);
          onClose();
        }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Agregar al carrito
        </button>
      </div>
    </div>
  </div>
);

export default ProductModal;

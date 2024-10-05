const Product = ({ producto, onSelect }) => (
    <div
      key={producto.id}
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(producto)}
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
  );
  
  export default Product;  
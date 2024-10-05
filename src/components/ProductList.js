import Product from './Product';

const ProductList = ({ productos, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {productos.map(producto => (
      <Product key={producto._id} producto={producto} onSelect={onSelect} />
    ))}
  </div>
);

export default ProductList;

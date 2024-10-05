const CategorySelector = ({ categorias, setCategoriaSeleccionada }) => (
    <select onChange={(e) => setCategoriaSeleccionada(e.target.value)} className="p-2 border rounded-md">
      {categorias.map(categoria => (
        <option key={categoria} value={categoria}>{categoria}</option>
      ))}
    </select>
  );
  
  export default CategorySelector;
  
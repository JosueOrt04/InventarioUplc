const CantidadDevolver = ({ 
  cantidadDevuelta, 
  onChange, 
  maxCantidad, 
  estado 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Cantidad a Devolver *
    </label>
    <input
      type="number"
      name="cantidadDevuelta"
      value={cantidadDevuelta}
      onChange={onChange}
      min="1"
      step="1"
      max={maxCantidad}
      required
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p
      className={`text-sm mt-1 ${
        estado.tipo === "completa"
          ? "text-green-600"
          : estado.tipo === "parcial"
          ? "text-orange-600"
          : "text-red-600"
      }`}
    >
      {estado.mensaje}
    </p>
  </div>
);

export default CantidadDevolver;
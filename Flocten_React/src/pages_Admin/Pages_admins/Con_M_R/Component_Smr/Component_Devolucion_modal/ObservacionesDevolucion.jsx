const ObservacionesDevolucion = ({ observaciones, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Observaciones de la Devolución
    </label>
    <textarea
      name="observaciones"
      value={observaciones}
      onChange={onChange}
      rows="3"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Observaciones sobre el estado de los items devueltos..."
    />
  </div>
);

export default ObservacionesDevolucion;
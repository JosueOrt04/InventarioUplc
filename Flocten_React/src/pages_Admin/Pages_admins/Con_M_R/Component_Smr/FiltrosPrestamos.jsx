// components/FiltrosPrestamos.jsx
import { useState } from 'react';

const FiltrosPrestamos = ({ filtros, onFiltrosChange, onBuscar }) => {
  const [busqueda, setBusqueda] = useState('');

  const handleFiltroChange = (key, value) => {
    onFiltrosChange({
      ...filtros,
      [key]: value
    });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscar(busqueda);
  };

  const limpiarFiltros = () => {
    onFiltrosChange({});
    setBusqueda('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="md:col-span-2">
          <form onSubmit={handleBuscar} className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por usuario, item o número de control..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Filtro Estado */}
        <select
          value={filtros.estado || ''}
          onChange={(e) => handleFiltroChange('estado', e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="devuelto">Devueltos</option>
          <option value="atrasado">Atrasados</option>
          <option value="incompleto">Incompletos</option>
        </select>

        {/* Filtro Tipo */}
        <select
          value={filtros.tipoItem || ''}
          onChange={(e) => handleFiltroChange('tipoItem', e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los tipos</option>
          <option value="Reactivo">Reactivos</option>
          <option value="Herramienta">Herramientas</option>
        </select>
      </div>

      {/* Botón limpiar filtros */}
      <div className="mt-3 flex justify-end">
        <button
          onClick={limpiarFiltros}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosPrestamos;




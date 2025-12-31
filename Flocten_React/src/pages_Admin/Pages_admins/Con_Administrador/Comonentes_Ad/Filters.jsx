// components/Con_Administrador/Filters.jsx
import React from "react";

export const Filters = ({ filters, setFilters }) => {
  const handleClear = () =>
    setFilters({
      laboratorio: "",
      fechaReserva: "",
      estado: "",
      page: 1,
    });

  return (
    <div className="bg-base-200 rounded-xl p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <select
          className="select select-bordered w-full bg-base-100"
          value={filters.laboratorio}
          onChange={(e) => setFilters({ ...filters, laboratorio: e.target.value })}
        >
          <option value="">Todos los Salones</option>
          <option value="Sal-A">Salon A</option>
    
        </select>

        <input
          type="date"
          className="input input-bordered w-full bg-base-100"
          value={filters.fechaReserva}
          onChange={(e) => setFilters({ ...filters, fechaReserva: e.target.value })}
        />

        <select
          className="select select-bordered w-full bg-base-100"
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
        >
          <option value="">Todos los estados</option>
          <option value="reservado">Reservado</option>
          <option value="en_uso">En Uso</option>
          <option value="finalizado">Finalizado</option>
             <option value="tiempo_finalizado">tiempo finalizado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <div className="lg:col-span-2 flex gap-2">
          <button className="btn btn-ghost flex-1" onClick={handleClear}>
            ❌ Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
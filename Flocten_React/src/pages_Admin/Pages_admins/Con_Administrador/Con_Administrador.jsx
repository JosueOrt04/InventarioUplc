// components/Con_Administrador/index.jsx
import { useState, useEffect } from "react";
import { useReservas } from "./reservas/useReservas";
import { Header } from "./Comonentes_Ad/Header";
import { Filters } from "./Comonentes_Ad/Filters";
import { Table } from "./Comonentes_Ad/Table";
import { Pagination } from "./Comonentes_Ad/Pagination";
import { ReservaForm } from "./reservas/ReservaForm";
import { ReservaDetail } from "./reservas/ReservaDetail";
import { DisponibilidadModal } from "./reservas/DisponibilidadModal";
import { ReporteModal } from "./reservas/ReporteModal";
import { useReservasHandlers } from "./Comonentes_Ad/hooks/useReservasHandlers";
import { EditarReservaModal } from "./reservas/EditarReservaModal";

export const Con_Administrador = () => {
  const [filters, setFilters] = useState({
    laboratorio: "",
    fechaReserva: "",
    estado: "",
    page: 1,
  });

  const { data, isLoading, error } = useReservas(filters);

  const {
    selectedReserva,
    setSelectedReserva,
    showForm,
    setShowForm,
    showDisponibilidad,
    setShowDisponibilidad,
    showReporte,
    setShowReporte,
    showEditar,
    setShowEditar,
    reservaParaEditar,
    handleCancelar,
    handleIniciar,
    handleFinalizar,
    handleEditar,
    handleCloseEditar,
    currentUserId,
  } = useReservasHandlers();

  const handleFilterChange = (newFilters) => {
    const { page, ...otherFilters } = newFilters;
    const currentFilters = { ...filters, ...otherFilters };

    const filtersChanged =
      JSON.stringify({ ...filters, page: 1 }) !==
      JSON.stringify({ ...currentFilters, page: 1 });

    setFilters({
      ...currentFilters,
      page: filtersChanged ? 1 : page,
    });
  };

  useEffect(() => {
    if (error) console.error("❌ Error en query:", error);
  }, [filters, data, error]);
console.log("handleEditar:", handleEditar);
  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header
          onReporte={() => setShowReporte(true)}
          onDisponibilidad={() => setShowDisponibilidad(true)}
          onNuevaReserva={() => setShowForm(true)}
        />

        <Filters filters={filters} setFilters={handleFilterChange} />

        {error && (
          <div className="alert alert-error">
            <span>Error al cargar reservas: {error.message}</span>
          </div>
        )}

        <Table
          data={data}
          isLoading={isLoading}
          onSelect={setSelectedReserva}
          onCancelar={handleCancelar}
          onIniciar={handleIniciar}
          onFinalizar={handleFinalizar}
          onEditar={handleEditar} // ✅ ESTA LÍNEA FALTABA
          currentUserId={currentUserId}
          
        />
        

        {data && data.totalPages > 0 && (
          <Pagination
            currentPage={data.currentPage || 1}
            totalPages={data.totalPages || 1}
            totalItems={data.total || 0}
            itemsPerPage={data.itemsPerPage || 10}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        )}

        {showForm && <ReservaForm onClose={() => setShowForm(false)} />}

        {showEditar && (
          <EditarReservaModal
            reserva={reservaParaEditar}
            onClose={handleCloseEditar}
            
          />
        )}

        {selectedReserva && (
          <ReservaDetail
            reserva={selectedReserva}
            onClose={() => setSelectedReserva(null)}
          />
        )}

        {showDisponibilidad && (
          <DisponibilidadModal onClose={() => setShowDisponibilidad(false)} />
        )}

        {showReporte && <ReporteModal onClose={() => setShowReporte(false)} />}
      </div>
    </div>
  );
};

export default Con_Administrador;

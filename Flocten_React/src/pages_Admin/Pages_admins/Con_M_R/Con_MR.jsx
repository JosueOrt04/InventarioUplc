// components/Con_MR.jsx
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePrestamos } from "./Component_Smr/usePrestamos";
import DashboardStats from "./Component_Smr/DashboardStats";
import PrestamosTable from "./Component_Smr/PrestamosTable";
import PrestamoModal from "./Component_Smr/PrestamoModal";
import DevolucionModal from "./Component_Smr/DevolucionModal";
import FiltrosPrestamos from "./Component_Smr/FiltrosPrestamos";

const Con_MR = () => {
  const { authUser, hasPermission } = useAuthStore();
  const {
    prestamos,
    estadisticas,
    loading,
    obtenerPrestamos,
    registrarPrestamo,
    registrarDevolucion,
    buscarPrestamos,
  } = usePrestamos();

  const [showPrestamoModal, setShowPrestamoModal] = useState(false);
  const [showDevolucionModal, setShowDevolucionModal] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({
    estado: "",
    tipoItem: "",
    usuario: "",
  });

  // Aplicar filtros
  useEffect(() => {
    obtenerPrestamos(filtros);
  }, [filtros]);

  const handleRegistrarPrestamo = async (datos) => {
    await registrarPrestamo(datos);
    setShowPrestamoModal(false);
  };

  const handleRegistrarDevolucion = async (prestamoId, datos) => {
    await registrarDevolucion(prestamoId, datos);
    setShowDevolucionModal(false);
    setPrestamoSeleccionado(null);
  };

  const abrirDevolucionModal = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setShowDevolucionModal(true);
  };

  if (!authUser) {
    return <div className="pt-24 flex justify-center">Cargando...</div>;
  }

  return (
    <div className="pt-24 p-6 min-h-screen ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Control de Materiales y Reactivos
        </h1>
        <p className="text-gray-600">
          Gestiona préstamos, devoluciones y control de inventario
        </p>
      </div>

      {/* Estadísticas */}
      <DashboardStats estadisticas={estadisticas} />

      {/* Filtros y Búsqueda */}
      <FiltrosPrestamos
        filtros={filtros}
        onFiltrosChange={setFiltros}
        onBuscar={buscarPrestamos}
      />

      {/* Botón Nuevo Préstamo */}
      {hasPermission("registro") && (
        <div className="mb-6">
          <button
            onClick={() => setShowPrestamoModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            + Nuevo Préstamo
          </button>
        </div>
      )}

      {/* Tabla de Préstamos */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <PrestamosTable
          prestamos={prestamos}
          loading={loading}
          onDevolucion={abrirDevolucionModal}
          hasPermission={hasPermission}
        />
      </div>

      {/* Modales */}
      {showPrestamoModal && (
        <PrestamoModal
          onClose={() => setShowPrestamoModal(false)}
          onConfirm={handleRegistrarPrestamo}
        />
      )}

      {showDevolucionModal && prestamoSeleccionado && (
        <DevolucionModal
          prestamo={prestamoSeleccionado}
          onClose={() => setShowDevolucionModal(false)}
          onConfirm={handleRegistrarDevolucion}
        />
      )}
    </div>
  );
};

export default Con_MR;

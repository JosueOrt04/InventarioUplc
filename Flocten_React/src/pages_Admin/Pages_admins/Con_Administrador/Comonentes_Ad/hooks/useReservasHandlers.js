// components/Con_Administrador/hooks/useReservasHandlers.js
import { useState } from "react";
import { useCancelarReserva, useIniciarUso } from "../../reservas/useReservas";
import { useAuthStore } from "../../../../../store/useAuthStore"; // ✅ Importar el store

export const useReservasHandlers = () => {
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDisponibilidad, setShowDisponibilidad] = useState(false);
  const [showReporte, setShowReporte] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [reservaParaEditar, setReservaParaEditar] = useState(null);
  
  // ✅ Obtener el usuario autenticado
  const { authUser } = useAuthStore();

  const cancelarMutation = useCancelarReserva();
  const iniciarMutation = useIniciarUso();

  const handleCancelar = (id) => {
    const razon = prompt("¿Motivo de cancelación?");
    if (razon) cancelarMutation.mutate({ id, razonCancelacion: razon });
  };

  const handleIniciar = (id) => {
    if (confirm("¿Marcar como 'En Uso'?")) iniciarMutation.mutate(id);
  };

  // ✅ Función para manejar finalización
  const handleFinalizar = (reserva) => {
    setSelectedReserva(reserva); // Abre el modal de detalles donde puede finalizar
  };

  // ✅ Función para manejar edición
  const handleEditar = (reserva) => {
    // Solo permitir editar reservas en estado "reservado"
    if (reserva.estado !== "reservado") {
      alert("⚠️ Solo se pueden editar reservas en estado 'RESERVADO'");
      return;
    }
    
    // Verificar permisos del usuario
    const esAdministrador = authUser?.permissions?.includes("registro");
    const esAsesorPropietario = reserva.asesorId?._id === authUser?._id || 
                                 reserva.asesorId === authUser?._id;
    
    if (!esAdministrador && !esAsesorPropietario) {
      alert("❌ No tienes permisos para editar esta reserva");
      return;
    }
    
    setReservaParaEditar(reserva);
    setShowEditar(true);
  };

  // ✅ Función para cerrar el modal de edición
  const handleCloseEditar = () => {
    setShowEditar(false);
    setReservaParaEditar(null);
  };

return {
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
  handleEditar, // ✅ Este debe estar presente
  handleCloseEditar,
  currentUserId: authUser?._id || authUser?.id,
  authUser,
};
};
// ReservasList.jsx
import { useObtenerReservas } from "../../useReservas";
import { useState } from "react";
import { ReservaForm } from "../../ReservaForm";

export const ReservasList = () => {
  // Define los filtros que necesites
  const filters = {
    // laboratorio: "lab1",
    // fechaReserva: "2024-01-01",
    // estado: "pendiente",
    // asesorId: "someId"
  };
  
  const { data, isLoading } = useObtenerReservas(filters); // ← Pasa los filtros
  const [reservaAEditar, setReservaAEditar] = useState(null);

  if (isLoading) return <p>Cargando reservas...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reservas Registradas</h2>

      {data?.reservas?.length === 0 && <p>No hay reservas aún.</p>}

      <div className="grid gap-4">
        {data?.reservas?.map((reserva) => (
          <div
            key={reserva._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p><strong>Laboratorio:</strong> {reserva.laboratorio}</p>
            <p><strong>Fecha:</strong> {reserva.fechaReserva}</p>
            <p><strong>Horario:</strong> {reserva.horaInicio} - {reserva.horaFin}</p>
            <p><strong>Maestro:</strong> {reserva.Nombre_Maestro}</p>

            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => setReservaAEditar(reserva)}
            >
              ✏️ Editar
            </button>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {reservaAEditar && (
        <ReservaForm
          reserva={reservaAEditar}
          onClose={() => setReservaAEditar(null)}
        />
      )}
    </div>
  );
};
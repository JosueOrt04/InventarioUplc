import React, { useState, useEffect } from "react";
import { useActualizarReserva } from "./useReservas";

export const EditarReservaModal = ({ reserva, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    laboratorio: "",
    fechaReserva: "",
    horaInicio: "",
    horaFin: "",
    turno: "",
    materia: "",
    numeroAlumnos: 0,
    equiposSolicitados: [],
  });

  const [equipoInput, setEquipoInput] = useState("");
  const {
    mutate: actualizarReserva,
    isPending,
    error,
  } = useActualizarReserva();

  // Inicializar datos del formulario
  useEffect(() => {
    if (reserva) {
      setFormData({
        laboratorio: reserva.laboratorio || "",
        fechaReserva: reserva.fechaReserva
          ? new Date(reserva.fechaReserva).toISOString().split("T")[0]
          : "",
        horaInicio: reserva.horaInicio || "",
        horaFin: reserva.horaFin || "",
        turno: reserva.turno || "",
        materia: reserva.materia || "",
        numeroAlumnos: reserva.numeroAlumnos || 0,
        equiposSolicitados: reserva.equiposSolicitados || [],
      });
    }
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numeroAlumnos" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddEquipo = () => {
    if (
      equipoInput.trim() &&
      !formData.equiposSolicitados.includes(equipoInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        equiposSolicitados: [...prev.equiposSolicitados, equipoInput.trim()],
      }));
      setEquipoInput("");
    }
  };

  const handleRemoveEquipo = (equipo) => {
    setFormData((prev) => ({
      ...prev,
      equiposSolicitados: prev.equiposSolicitados.filter((e) => e !== equipo),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.laboratorio ||
      !formData.fechaReserva ||
      !formData.horaInicio ||
      !formData.horaFin
    ) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    // Solo enviar campos editables
    const datosParaEnviar = {
      laboratorio: formData.laboratorio,
      fechaReserva: formData.fechaReserva,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      turno: formData.turno,
      materia: formData.materia,
      numeroAlumnos: formData.numeroAlumnos,
      equiposSolicitados: formData.equiposSolicitados,
    };

    actualizarReserva(
      { id: reserva._id, ...datosParaEnviar },
      {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
        onError: (err) => {
          console.error("Error al actualizar:", err);
        },
      }
    );
  };

  if (!reserva) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">📝 Editar Reserva</h3>
        <p className="text-sm text-base-content/70 mb-4">
          ID: {reserva._id} | Estado: {reserva.estado}
        </p>

        {error && (
          <div className="alert alert-error mb-4">
            <span>
              Error: {error.message || "No se pudo actualizar la reserva"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Información del asesor (solo lectura) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-base-200 rounded-lg">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Empleo</span>
              </label>
              <input
                type="text"
                value={reserva.nombreAsesor}
                readOnly
                className="input input-bordered w-full bg-base-100"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">No. Control</span>
              </label>
              <input
                type="text"
                value={reserva.controlNumberAsesor}
                readOnly
                className="input input-bordered w-full bg-base-100"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Estado actual</span>
              </label>
              <input
                type="text"
                value={reserva.estado}
                readOnly
                className="input input-bordered w-full bg-base-100 uppercase"
              />
            </div>
          </div>

          {/* Campos editables */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Salon *</span>
                </label>
                <select
                  name="Salon"
                  value={formData.laboratorio}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Sal-A">Salon A</option>
                  <option value="Sal-B">Salon B</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Fecha de Reserva *</span>
                </label>
                <input
                  type="date"
                  name="fechaReserva"
                  value={formData.fechaReserva}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Hora Inicio *</span>
                </label>
                <input
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Hora Fin *</span>
                </label>
                <input
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Turno</span>
                </label>
                <select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Seleccionar...</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                  <option value="NT">NT</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Tipo</span>
                </label>
                <input
                  type="text"
                  name="materia"
                  value={formData.materia}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Ej: Programación Avanzada"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Número de Alumnos</span>
                </label>
                <input
                  type="number"
                  name="numeroAlumnos"
                  value={formData.numeroAlumnos}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Equipos solicitados */}
            <div>
              <label className="label">
                <span className="label-text">Equipos Solicitados</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={equipoInput}
                  onChange={(e) => setEquipoInput(e.target.value)}
                  className="input input-bordered flex-grow"
                  placeholder="Ej: Computadora, Proyector"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddEquipo())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddEquipo}
                  className="btn btn-outline btn-primary"
                >
                  Agregar
                </button>
              </div>

              {formData.equiposSolicitados.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.equiposSolicitados.map((equipo, index) => (
                    <div key={index} className="badge badge-primary gap-1">
                      {equipo}
                      <button
                        type="button"
                        onClick={() => handleRemoveEquipo(equipo)}
                        className="text-xs hover:text-error"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Actualizando...
                </>
              ) : (
                "Actualizar Reserva"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

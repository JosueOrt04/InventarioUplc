// ReservaDetail.jsx
import {
  useCancelarReserva,
  useIniciarUso,
  useFinalizarReserva,
} from "./useReservas";
import { useState } from "react";
import { User2 } from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore"; // ✅ Importar el store

export const ReservaDetail = ({ reserva, onClose }) => {
  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState(null);

  // ✅ Obtener el usuario autenticado
  const { authUser } = useAuthStore();

  const cancelarMutation = useCancelarReserva();
  const iniciarMutation = useIniciarUso();
  const finalizarMutation = useFinalizarReserva();

  // ✅ Función para verificar si el usuario actual es el dueño de la reserva
  const esPropietario = () => {
    return authUser && reserva.asesorId?._id === authUser._id;
  };

  const handleCancelar = () => {
    const razon = prompt("Motivo de cancelación:");
    if (razon) {
      cancelarMutation.mutate({ id: reserva._id, razonCancelacion: razon });
    }
  };

  const handleIniciar = () => {
    iniciarMutation.mutate(reserva._id);
  };

  const handleFinalizar = () => {
    // Validar que al menos haya comentario o imagen
    if (!comentario.trim() && !imagen) {
      alert(
        "Debe proporcionar al menos un comentario o una imagen de devolución"
      );
      return;
    }

    const formData = new FormData();

    // Solo agregar si tiene contenido
    if (comentario.trim()) {
      formData.append("comentarioDevolucion", comentario.trim());
    }

    if (imagen) {
      // Validar tipo y tamaño de imagen
      if (!imagen.type.startsWith("image/")) {
        alert("Por favor, seleccione un archivo de imagen válido");
        return;
      }
      if (imagen.size > 5 * 1024 * 1024) {
        // 5MB máximo
        alert("La imagen es demasiado grande. Máximo 5MB");
        return;
      }
      formData.append("imagenDevolucion", imagen);
    }

    // Debug: mostrar contenido del FormData

    for (let [key, value] of formData.entries()) {
    }

    finalizarMutation.mutate(
      {
        id: reserva._id,
        formData,
      },
      {
        onSuccess: () => {
          // Limpiar formulario después del éxito
          setComentario("");
          setImagen(null);
        },
      }
    );
  };

  // ✅ Determinar si mostrar acciones
  const mostrarAcciones = esPropietario();

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl">
        <h3 className="font-bold text-lg">Detalle de Reserva</h3>

        {/* Sección de imagen del asesor */}
        <div className="mt-4">
          <strong>Asesor:</strong>{" "}
          <div className="inline-block align-middle ml-3">
            {reserva.imagenAsesor ? (
              <img
                className="w-12 h-12 object-cover rounded-full border border-gray-200"
                src={reserva.imagenAsesor}
                alt={`Foto de ${reserva.asesorId?.fullName || "asesor"}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full border border-gray-200 bg-base-300 flex items-center justify-center"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              >
                <User2 className="w-6 h-6 text-base-content/60" />
              </div>
            )}
          </div>
          <span className="ml-2 align-middle">
            {reserva.asesorId?.fullName || "No disponible"}
            {mostrarAcciones && (
              <span className="badge badge-sm badge-primary ml-2">Tú</span>
            )}
          </span>
        </div>

        <div className="py-4 grid grid-cols-2 gap-4">
          <div>
            <strong>Salon:</strong> {reserva.laboratorio}
          </div>
          <div>
            <strong>Empleado:</strong>{" "}
            {reserva.asesorId?.fullName || "No disponible"}
          </div>
          <div>
            <strong>Fecha:</strong> {reserva.fechaReserva}
          </div>
          <div>
            <strong>Horario:</strong> {reserva.horaInicio} - {reserva.horaFin} (
            {reserva.turno})
          </div>
          <div>
            <strong>Tipo:</strong> {reserva.materia || "-"}
          </div>
          <div>
            <strong>Estado:</strong>{" "}
            <span
              className={`badge ${
                reserva.estado === "reservado"
                  ? "badge-warning"
                  : reserva.estado === "en_uso"
                  ? "badge-info"
                  : reserva.estado === "finalizado"
                  ? "badge-success"
                  : reserva.estado === "cancelado"
                  ? "badge-error"
                  : "badge-accent"
              }`}
            >
              {reserva.estado}
            </span>
          </div>
          <div className="col-span-2">
            <strong>Equipos:</strong>{" "}
            {reserva.equiposSolicitados?.join(", ") || "Ninguno"}
          </div>
          <div className="col-span-2">
            <strong>Observación Recepción:</strong>{" "}
            {reserva.observacionRecepcion || "-"}
          </div>
          {reserva.razonCancelacion && (
            <div className="col-span-2 text-error">
              <strong>Razón Cancelación:</strong> {reserva.razonCancelacion}
            </div>
          )}
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-2 gap-4">
          {reserva.imagenRecepcion && (
            <div>
              <strong>Recepción evidencia:</strong>
              <img
                src={`http://localhost:5001/${reserva.imagenRecepcion}`}
                alt="Recepción"
                className="rounded-lg shadow-md mt-2 w-full"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          )}

          {reserva.imagenDevolucion && (
            <div>
              <strong>Devolución evidencia:</strong>
              <img
                src={`http://localhost:5001/${reserva.imagenDevolucion}`}
                alt="Devolución"
                className="rounded-lg shadow-md mt-2 w-full"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        {/* Acciones según estado - SOLO PARA EL PROPIETARIO */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cerrar
          </button>

          {mostrarAcciones ? (
            <>
              {reserva.estado === "reservado" && (
                <>
                  <button
                    className="btn btn-error"
                    onClick={handleCancelar}
                    disabled={cancelarMutation.isLoading}
                  >
                    {cancelarMutation.isLoading
                      ? "Cancelando..."
                      : "Cancelar Reserva"}
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={handleIniciar}
                    disabled={iniciarMutation.isLoading}
                  >
                    {iniciarMutation.isLoading ? "Iniciando..." : "Iniciar Uso"}
                  </button>
                </>
              )}

              {(reserva.estado === "en_uso" ||
                reserva.estado === "tiempo_finalizado") && (
                <div className="w-full">
                  {/* Mensajes de error */}
                  {finalizarMutation.isError && (
                    <div className="alert alert-error mb-4">
                      <span>
                        Error al finalizar reserva:{" "}
                        {finalizarMutation.error.response?.data?.message ||
                          "Error desconocido"}
                      </span>
                    </div>
                  )}

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Comentario de Devolución
                      </span>
                      <span className="label-text-alt text-error">
                        *Requerido si no hay imagen
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="Describa el estado de devolución..."
                      rows="3"
                    />
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text">Foto de Devolución</span>
                      <span className="label-text-alt text-error">
                        *Requerida si no hay comentario
                      </span>
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full"
                      accept="image/*"
                      onChange={(e) => setImagen(e.target.files[0])}
                    />
                    {imagen && (
                      <div className="mt-2 text-sm text-info">
                        Archivo seleccionado: {imagen.name}
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-success mt-4 w-full"
                    onClick={handleFinalizar}
                    disabled={finalizarMutation.isLoading}
                  >
                    {finalizarMutation.isLoading
                      ? "Finalizando..."
                      : "Finalizar Reserva"}
                  </button>
                </div>
              )}
            </>
          ) : (
            // ✅ Mensaje para usuarios que no son propietarios
            <div className="text-center w-full py-4">
              <p className="text-base-content/60 italic">
                Solo el Empleado que realizó la reserva puede realizar acciones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// components/Con_Administrador/Table.jsx
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { User2 } from "lucide-react";

const estadoStyles = {
  reservado: "badge-warning",
  en_uso: "badge-info",
  tiempo_finalizado: "badge-accent",
  finalizado: "badge-success",
  cancelado: "badge-error",
};

export const Table = ({
  data,
  isLoading,
  onSelect,
  onCancelar,
  onIniciar,
  onFinalizar,
  onEditar,
  currentUserId, // ✅ Recibimos el ID del usuario actual como prop
}) => {
  if (isLoading)
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/70 mt-2">Cargando reservas...</p>
      </div>
    );

  if (!data?.reservas?.length)
    return (
      <div className="text-center py-12 text-base-content/60">
        <p className="text-lg">No hay reservas registradas</p>
        <p className="text-sm">Intenta ajustar tus filtros</p>
      </div>
    );

  // Función para verificar si el usuario actual es el dueño de la reserva
  const esPropietario = (reserva) => {
    return currentUserId && reserva.asesorId?._id === currentUserId;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-primary text-primary-content sticky top-0 z-10">
          <tr>
            <th>Salon</th>
            <th>Asesor</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Materia</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.reservas.map((reserva) => {
            const esMiReserva = esPropietario(reserva);

            return (
              <tr
                key={reserva._id}
                className="hover:bg-base-200 transition-colors"
              >
                <td className="font-bold">{reserva.laboratorio}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring-1 ring-base-300">
                        {reserva.imagenAsesor ? (
                          <img
                            src={reserva.imagenAsesor}
                            alt={reserva.asesorId?.fullName}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-base-300">
                            <User2 className="w-6 h-6 text-base-content/60" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {reserva.asesorId?.fullName}
                        {esMiReserva && (
                          <span className="badge badge-sm badge-primary ml-2">
                            Tú
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-base-content/60">
                        {reserva.asesorId?.controlNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {format(new Date(reserva.fechaReserva), "dd MMM yyyy", {
                    locale: es,
                  })}
                </td>
                <td>
                  {reserva.horaInicio} - {reserva.horaFin}
                  <div className="badge badge-sm badge-outline">
                    {reserva.turno}
                  </div>
                </td>
                <td>{reserva.materia || "-"}</td>
                <td>
                  <span className={`badge ${estadoStyles[reserva.estado]}`}>
                    {reserva.estado}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-1">
                    {/* Botón de ver detalles - siempre visible */}
                    <button
                      className="btn btn-xs btn-square btn-ghost"
                      onClick={() => onSelect(reserva)}
                      title="Ver detalles"
                    >
                      👁️
                    </button>

                    {/* Botones de acción - solo para el propietario */}
                    {esMiReserva && (
                      <>
                        {reserva.estado === "reservado" && (
                          <>
                            <button
                              className="btn btn-xs btn-square btn-ghost text-error"
                              onClick={() => onCancelar(reserva._id)}
                              title="Cancelar reserva"
                            >
                              ❌
                            </button>
                            <button
                              className="btn btn-xs btn-square btn-ghost text-info"
                              onClick={() => onIniciar(reserva._id)}
                              title="Iniciar uso del laboratorio"
                            >
                              ▶️
                            </button>

                            {/* ✅ AQUÍ VA TU NUEVO BOTÓN DE EDITAR */}
                            <button
                              className="btn btn-xs btn-square btn-ghost text-warning"
                              onClick={() => onEditar(reserva)}
                              title="Editar reserva"
                            >
                              ✏️
                            </button>
                          </>
                        )}

                        {(reserva.estado === "en_uso" ||
                          reserva.estado === "tiempo_finalizado") && (
                          <button
                            className="btn btn-xs btn-square btn-ghost text-success"
                            onClick={() => onFinalizar(reserva)}
                            title="Finalizar reserva"
                          >
                            ✅
                          </button>
                        )}
                      </>
                    )}

                    {/* Mensaje para reservas de otros usuarios */}
                    {!esMiReserva && (
                      <span
                        className="text-xs text-base-content/40 italic"
                        title="Solo el asesor que hizo la reserva puede realizar acciones"
                      >
                        Solo el asesor
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

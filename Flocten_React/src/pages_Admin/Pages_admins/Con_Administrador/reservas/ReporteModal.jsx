import { useState } from "react";
import { useReporteOcupacion } from "./useReservas";
import { format } from "date-fns";


export const ReporteModal = ({ onClose }) => {
  const [params, setParams] = useState({
    fechaInicio: new Date().toISOString().split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
    laboratorio: "",
  });

  const { data, isLoading } = useReporteOcupacion(params);

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-6xl">
        <h3 className="font-bold text-lg">Reporte de Ocupación</h3>

        <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
          <input
            type="date"
            className="input input-bordered"
            value={params.fechaInicio}
            onChange={(e) => setParams({ ...params, fechaInicio: e.target.value })}
          />
          <input
            type="date"
            className="input input-bordered"
            value={params.fechaFin}
            onChange={(e) => setParams({ ...params, fechaFin: e.target.value })}
          />
          <select
            className="select select-bordered"
            value={params.laboratorio}
            onChange={(e) => setParams({ ...params, laboratorio: e.target.value })}
          >
            <option value="">Todos los Salon</option>
            <option value="Sal-A">Salon A</option>
          </select>
        </div>

        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <>
            {/* ESTADÍSTICAS */}
            <div className="stats shadow mb-6">
              <div className="stat">
                <div className="stat-title">Total Reservas</div>
                <div className="stat-value">{data?.estadisticas?.totalReservas || 0}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Ocupación</div>
                <div className="stat-value">{data?.estadisticas?.porcentajeOcupacion}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Días Analizados</div>
                <div className="stat-value">{data?.estadisticas?.diasAnalizados}</div>
              </div>
            </div>

            {/* POR LABORATORIO */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(data?.estadisticas?.porLaboratorio || {}).map(([lab, cantidad]) => (
                <div key={lab} className="card bg-base-200 p-4">
                  <h5 className="font-bold">{lab}</h5>
                  <p>{cantidad} reservas</p>
                </div>
              ))}
            </div>

            {/* LISTADO */}
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Horario</th>
                    <th>Salon</th>
                    <th>Asesor</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.reservas?.map((r) => (
                    <tr key={r._id}>
                      <td>{format(new Date(r.fechaReserva), "dd/MM/yyyy")}</td>
                      <td>
                        {r.horaInicio} - {r.horaFin}
                      </td>
                      <td>{r.laboratorio}</td>
                      <td>{r.asesorId?.fullName}</td>
                      <td>
                        <span className={`badge badge-sm ${r.estado === "finalizado" ? "badge-success" : "badge-warning"}`}>
                          {r.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => window.print()}>
            🖨️ Imprimir
          </button>
          <button className="btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
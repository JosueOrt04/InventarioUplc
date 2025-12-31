// components/LaboratorioInfo.jsx
import React from "react";
import { useDisponibilidad } from "../useReservas";
import { useObtenerReservas } from "../useReservas";
import { HorariosOcupadosList } from "./HorariosOcupadosList";

// En LaboratorioInfo.jsx
export const LaboratorioInfo = ({ laboratorio, fecha }) => {
  const { data: disponibilidad, isLoading: loadingDisp } = useDisponibilidad(laboratorio, fecha);

  const { data: reservadasData } = useObtenerReservas({
    laboratorio,
    fechaReserva: fecha,
    estado: "reservado",
  });

  const { data: enUsoData } = useObtenerReservas({
    laboratorio,
    fechaReserva: fecha,
    estado: "en_uso",
  });

  const { data: canceladasData } = useObtenerReservas({
    laboratorio,
    fechaReserva: fecha,
    estado: "cancelado",
  });

  if (loadingDisp) return <div>Cargando...</div>;

  return (
    <div className="space-y-4">
      {/* Reservas en uso */}
      {enUsoData?.reservas?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <h4 className="font-semibold text-blue-700 text-sm mb-2">🔴 En Uso</h4>
          {enUsoData.reservas.map((r) => (
            <div key={r._id} className="text-sm text-blue-800">
              {r.horaInicio} - {r.horaFin} → {r.nombreAsesor}
            </div>
          ))}
        </div>
      )}

      {/* Reservas reservadas */}
      {reservadasData?.reservas?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <h4 className="font-semibold text-yellow-700 text-sm mb-2">🟡 Reservadas</h4>
          {reservadasData.reservas.map((r) => (
            <div key={r._id} className="text-sm text-yellow-800">
              {r.horaInicio} - {r.horaFin} → {r.nombreAsesor}
            </div>
          ))}
        </div>
      )}

      {/* Reservas canceladas */}
      {canceladasData?.reservas?.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded p-3">
          <h4 className="font-semibold text-orange-700 text-sm mb-2">🔄 Canceladas</h4>
          {canceladasData.reservas.map((r) => (
            <div key={r._id} className="text-sm text-orange-800">
              {r.horaInicio} - {r.horaFin} → {r.nombreAsesor}
              {r.razonCancelacion && (
                <span className="text-xs text-gray-600 ml-2">({r.razonCancelacion})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
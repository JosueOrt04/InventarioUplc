import React from "react";

export const HorariosOcupadosList = ({ horarios }) => {
  if (!horarios?.length) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <h4 className="text-red-700 font-semibold text-sm mb-3 flex items-center gap-2">
        ⚠️ Horarios Ocupados
      </h4>
      <div className="space-y-2">
        {horarios.map((h, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white p-2 rounded border border-red-100"
          >
            <div className="text-red-600 text-sm font-medium">
              {h.horaInicio} - {h.horaFin}
            </div>
            <div className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded">
              Reservado
            </div>
          </div>
        ))}
      </div>
      <p className="text-red-600 text-xs mt-2">
        No podrá seleccionar horarios que se solapen con estos rangos
      </p>
    </div>
  );
};

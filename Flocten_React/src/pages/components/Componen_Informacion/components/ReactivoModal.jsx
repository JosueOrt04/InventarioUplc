import React from "react";

// Pictogramas SVG en lugar de emojis para mayor profesionalismo
export const HAZARD_PICTOGRAMS = [
  { id: "flammable", label: "Inflamable", icon: "🔥", color: "bg-red-500" },
  { id: "toxic", label: "Tóxico", icon: "☠️", color: "bg-purple-500" },
  { id: "corrosive", label: "Corrosivo", icon: "⚠️", color: "bg-orange-500" },
  { id: "explosive", label: "Explosivo", icon: "💥", color: "bg-red-600" },
  { id: "oxidizing", label: "Oxidante", icon: "⚡", color: "bg-yellow-500" },
  {
    id: "health-hazard",
    label: "Peligro para la salud",
    icon: "🚑",
    color: "bg-blue-500",
  },
  {
    id: "environment",
    label: "Peligro ambiental",
    icon: "🌍",
    color: "bg-green-600",
  },
];

export const HAZARD_PHRASES = [
  { code: "H315", text: "Causa irritación cutánea" },
  { code: "H318", text: "Provoca graves lesiones oculares" },
  { code: "H335", text: "Puede irritar las vías respiratorias" },
  { code: "H301", text: "Tóxico en caso de ingestión" },
  { code: "H311", text: "Tóxico en contacto con la piel" },
  { code: "H370", text: "Provoca daños en los órganos" },
];

const ReactivoModal = ({ reactivo, onClose }) => {
  const getPictogramas = () => {
    if (
      !reactivo.pictogramasPeligro ||
      !Array.isArray(reactivo.pictogramasPeligro)
    )
      return [];
    return reactivo.pictogramasPeligro
      .map((id) => HAZARD_PICTOGRAMS.find((p) => p.id === id))
      .filter(Boolean);
  };

  const getFrases = () => {
    if (!reactivo.frasesPeligro || !Array.isArray(reactivo.frasesPeligro))
      return [];
    return reactivo.frasesPeligro
      .map((code) => HAZARD_PHRASES.find((f) => f.code === code))
      .filter(Boolean);
  };

  const pictogramas = getPictogramas();
  const frases = getFrases();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header profesional */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {reactivo.codigo}
              </h2>
              <p className="text-slate-300 mt-1">
                {reactivo.fullName || reactivo.nombre}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-2xl"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto flex-1">
          {/* Área de imágenes principal - AHORA MÁS GRANDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 border-b border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Imagen del Reactivo
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 h-96 flex items-center justify-center">
                <img
                  src={reactivo.imagenReactivo}
                  alt={reactivo.codigo}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Símbolo de Identificación
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 h-96 flex items-center justify-center">
                <img
                  src={reactivo.imagenSimbolo}
                  alt={`Símbolo ${reactivo.codigo}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Información en cards organizada */}
          <div className="p-8 space-y-8">
            {/* Información básica */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-slate-600 rounded mr-3"></span>
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard label="Código" value={reactivo.codigo} />
                <InfoCard label="Nombre" value={reactivo.nombre} />
                <InfoCard
                  label="Nombre Completo"
                  value={reactivo.fullName || "N/A"}
                />
                <InfoCard label="Fórmula" value={reactivo.formula || "N/A"} />
                <InfoCard
                  label="Cantidad"
                  value={`${reactivo.cantidad} unidades`}
                />
                <InfoCard
                  label="Número de Control"
                  value={reactivo.controlNumber || "N/A"}
                />
              </div>
            </section>

            {/* Lote y Concentración */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
                  Control de Lote
                </h3>
                <div className="bg-blue-50/50 rounded-xl p-6 space-y-4">
                  <DetailRow
                    label="Número de Lote"
                    value={reactivo.numeroLote || "N/A"}
                  />
                  <DetailRow
                    label="Fecha de Creación"
                    value={
                      reactivo.createdAt
                        ? new Date(reactivo.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"
                    }
                  />
                </div>
              </section>

              {reactivo.concentracion && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                    <span className="w-1 h-6 bg-green-500 rounded mr-3"></span>
                    Concentración
                  </h3>
                  <div className="bg-green-50/50 rounded-xl p-6">
                    <p className="text-2xl font-bold text-green-700">
                      {reactivo.concentracion}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Descripción */}
            {reactivo.descripcion && (
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-purple-500 rounded mr-3"></span>
                  Descripción
                </h3>
                <div className="bg-purple-50/50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {reactivo.descripcion}
                  </p>
                </div>
              </section>
            )}

            {/* Seguridad - Pictogramas y Frases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pictogramas.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                    <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                    Pictogramas de Peligro
                  </h3>
                  <div className="bg-orange-50/50 rounded-xl p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {pictogramas.map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div
                            className={`w-16 h-16 ${p.color} rounded-full mx-auto flex items-center justify-center text-2xl text-white mb-2`}
                          >
                            {p.icon}
                          </div>
                          <p className="text-xs font-medium text-gray-700">
                            {p.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {frases.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                    <span className="w-1 h-6 bg-red-500 rounded mr-3"></span>
                    Frases de Peligro (H-Statements)
                  </h3>
                  <div className="bg-red-50/50 rounded-xl p-6">
                    <ul className="space-y-3">
                      {frases.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-red-600 font-bold">
                            {f.code}
                          </span>
                          <span className="text-gray-700 flex-1">{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Primeros Auxilios y Manejo Seguro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {reactivo.primerosAuxilios && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                    <span className="w-1 h-6 bg-yellow-500 rounded mr-3"></span>
                    Primeros Auxilios
                  </h3>
                  <div className="bg-yellow-50/50 rounded-xl p-6 border-l-4 border-yellow-500">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {reactivo.primerosAuxilios}
                    </p>
                  </div>
                </section>
              )}

              {reactivo.manejoSeguro && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                    <span className="w-1 h-6 bg-teal-500 rounded mr-3"></span>
                    Manejo Seguro
                  </h3>
                  <div className="bg-teal-50/50 rounded-xl p-6 border-l-4 border-teal-500">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {reactivo.manejoSeguro}
                    </p>
                  </div>
                </section>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-600 font-semibold mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Consideraciones de Seguridad
              </p>
              {/* Consideraciones Generales de Seguridad */}
              <p className="text-gray-700">
                Recuerda seguir todos los protocolos de seguridad al manipular
                este reactivo. Utiliza el equipo de protección personal adecuado
                y trabaja en áreas bien ventiladas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-5 flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares para mejor organización
const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-sm transition-shadow">
    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="font-semibold text-gray-900 text-lg">{value}</p>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

export default ReactivoModal;

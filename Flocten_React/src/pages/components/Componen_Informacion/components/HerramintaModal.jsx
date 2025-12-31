import React from "react";

const HerramientaModal = ({ herramienta, onClose }) => {
  if (!herramienta) return null;

  // Determinar color del badge según el estado
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "disponible":
        return "bg-green-500";
      case "en uso":
        return "bg-yellow-500";
      case "mantenimiento":
        return "bg-orange-500";
      case "dañado":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header profesional */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {herramienta.codigo}
              </h2>
              <p className="text-slate-300 mt-1">
                {herramienta.fullName || herramienta.nombre}
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
          {/* Área de imágenes principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 border-b border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Imagen Principal
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 h-80 flex items-center justify-center">
                {herramienta.imagen || herramienta.imagenHerramienta ? (
                  <img
                    src={herramienta.imagen || herramienta.imagenHerramienta}
                    alt={herramienta.nombre}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg
                      className="w-16 h-16 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-sm">Sin imagen</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Imagen Adicional
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 h-80 flex items-center justify-center">
                {herramienta.imagenAdicional ? (
                  <img
                    src={herramienta.imagenAdicional}
                    alt={`Vista adicional de ${herramienta.nombre}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg
                      className="w-16 h-16 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">Sin imagen adicional</span>
                  </div>
                )}
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
                <InfoCard label="Código" value={herramienta.codigo} />
                <InfoCard label="Nombre" value={herramienta.nombre} />
                <InfoCard
                  label="Nombre Completo"
                  value={herramienta.fullName || "N/A"}
                />
                <InfoCard label="Tipo" value={herramienta.tipo || "N/A"} />
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-sm transition-shadow">
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                    Estado
                  </p>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 ${getEstadoColor(
                        herramienta.estado
                      )} rounded-full mr-2`}
                    ></div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {herramienta.estado || "N/A"}
                    </p>
                  </div>
                </div>
                <InfoCard
                  label="Cantidad"
                  value={`${herramienta.cantidad || "0"} unidades`}
                />
              </div>
            </section>

            {/* Identificación y Control */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
                  Identificación
                </h3>
                <div className="bg-blue-50/50 rounded-xl p-6 space-y-4">
                  <DetailRow
                    label="Número de Control"
                    value={herramienta.controlNumber || "N/A"}
                  />
                  <DetailRow
                    label="Número de Lote"
                    value={herramienta.numeroLote || "N/A"}
                  />
                  <DetailRow
                    label="Número de Serie"
                    value={herramienta.numeroSerie || "N/A"}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-green-500 rounded mr-3"></span>
                  Información de Registro
                </h3>
                <div className="bg-green-50/50 rounded-xl p-6 space-y-4">
                  <DetailRow
                    label="Fecha de Creación"
                    value={formatDate(herramienta.createdAt)}
                  />
                  <DetailRow
                    label="Última Actualización"
                    value={formatDate(herramienta.updatedAt)}
                  />
                </div>
              </section>
            </div>

            {/* Descripción */}
            {herramienta.descripcion && (
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-purple-500 rounded mr-3"></span>
                  Descripción
                </h3>
                <div className="bg-purple-50/50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {herramienta.descripcion}
                  </p>
                </div>
              </section>
            )}

            {/* Consideraciones de Uso */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-blue-600 font-semibold mb-3 flex items-center">
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
                Consideraciones de Uso
              </p>
              <p className="text-gray-700">
                Verifique el estado de la herramienta antes de cada uso. 
                Reporte cualquier anomalía o daño inmediatamente al responsable del laboratorio. 
                Mantenga las herramientas limpias y almacenadas correctamente después de su uso.
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

// Componentes auxiliares (los mismos que en ReactivoModal)
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

export default HerramientaModal;
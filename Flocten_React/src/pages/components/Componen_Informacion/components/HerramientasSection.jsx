const HerramientasSection = ({ herramientas, onViewCompleteInfo }) => {
  if (!herramientas.length) {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No hay herramientas registradas
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          No se encontraron herramientas en el inventario.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {herramientas.map((herramienta, index) => (
        <HerramientaItem
          key={`herramienta-${herramienta._id}`}
          herramienta={herramienta}
          index={index}
          onViewCompleteInfo={onViewCompleteInfo}
        />
      ))}
    </div>
  );
};

const HerramientaItem = ({ herramienta, index, onViewCompleteInfo }) => (
  <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg">
    <input
      type="radio"
      name="herramienta-accordion"
      defaultChecked={index === 0}
    />
    <div className="collapse-title font-medium p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          {herramienta.imagenHerramienta ? (
            <img
              src={herramienta.imagenHerramienta}
              alt={herramienta.codigo}
              className="w-12 h-12 object-contain rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
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
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-800">
              {herramienta.codigo}
            </h3>
            <p className="text-sm text-gray-600">{herramienta.nombre}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {herramienta.cantidad} unidades
          </span>
        </div>
      </div>
    </div>
    <div className="collapse-content">
      <div className="grid grid-cols-2 gap-4 text-sm pt-2">
             <div className="flex flex-col md:flex-row gap-4 md:col-span-2">
          <div className="flex-1 flex flex-col items-center">
            <p className="text-gray-500 mb-2 text-lg">Imagen del herramienta</p>
            <img
              src={herramienta.imagenHerramienta}
              alt={herramienta.codigo}
              className="w-full max-w-xs h-64 object-contain rounded-xl border-2 border-base-300 shadow-md"
            />
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="text-gray-500 mb-2 text-lg">Imagen Adicional</p>
            <img
              src={herramienta.imagenAdicional}
              alt={herramienta.codigo}
          
              className="w-full max-w-xs h-64 object-contain rounded-xl border-2 border-base-300 shadow-md"
            />
          </div>
        </div>
        <div>
          <p className="text-gray-500">N° Lote</p>
          <p className="font-medium">{herramienta.numeroLote || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-500">N° Serie</p>
          <p className="font-medium">{herramienta.numeroSerie || "N/A"}</p>
        </div>
        {herramienta.tipo && (
          <div>
            <p className="text-gray-500">Tipo</p>
            <p className="font-medium">{herramienta.tipo}</p>
          </div>
        )}
        <div>
          <p className="text-gray-500">Estado</p>
          <p className="font-medium">{herramienta.estado}</p>
        </div>
      </div>

      {herramienta.descripcion && (
        <div className="mt-3">
          <p className="text-gray-500">Descripción</p>
          <p className="text-sm text-gray-700">{herramienta.descripcion}</p>
        </div>
      )}

      {onViewCompleteInfo && (
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="button"
            onClick={() => onViewCompleteInfo(herramienta)}
            className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold"
          >
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Visualizar Información Completa
          </button>
        </div>
      )}
    </div>
  </div>
);

export default HerramientasSection;

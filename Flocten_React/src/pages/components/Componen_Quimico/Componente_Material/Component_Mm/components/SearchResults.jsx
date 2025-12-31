import React from "react";

const SearchResults = ({
  resultadosBusqueda,
  mostrarResultados,
  onSelectTool,
}) => {
  if (!mostrarResultados || resultadosBusqueda.length === 0) return null;

  return (
    <div className="mt-4">
      {resultadosBusqueda.length > 0 ? (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-sm text-base-content/70 mb-2">
            Se encontraron {resultadosBusqueda.length} resultado(s)
          </p>
          {resultadosBusqueda.map((herramienta) => (
            <div
              key={herramienta._id}
              onClick={() => onSelectTool(herramienta._id)}
              className="cursor-pointer p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{herramienta.nombre}</p>
                  <p className="text-sm text-base-content/70">
                    Código: {herramienta.codigo}
                  </p>
                  <p className="text-sm text-base-content/70">
                    Tipo: {herramienta.tipo}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>No se encontraron herramientas con ese término</span>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

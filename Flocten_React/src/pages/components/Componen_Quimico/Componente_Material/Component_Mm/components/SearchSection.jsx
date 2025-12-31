import React from "react";

const SearchSection = ({
  terminoBusqueda,
  setTerminoBusqueda,
  buscarHerramientas,
  buscando,
  formData,
  cargandoDatos,
  limpiarSeleccion,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Buscar Herramienta para Modificar
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && buscarHerramientas()}
            className="input input-bordered flex-1"
          />
          <button
            onClick={buscarHerramientas}
            disabled={buscando}
            className="btn btn-primary"
          >
            {buscando ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Buscar"
            )}
          </button>
        </div>

        {/* Herramienta seleccionada */}
        {formData._id && (
          <div className="mt-4 p-3 bg-success/10 border border-success rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success font-semibold">
                  Herramienta seleccionada:
                </p>
                <p className="text-sm">
                  {formData.nombre} (Código: {formData.codigo})
                </p>
              </div>
              <button
                onClick={limpiarSeleccion}
                className="btn btn-sm btn-ghost text-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cambiar
              </button>
            </div>
          </div>
        )}

        {cargandoDatos && (
          <div className="mt-4 flex items-center gap-2 text-base-content/70">
            <span className="loading loading-spinner loading-sm"></span>
            Cargando datos de la herramienta...
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;

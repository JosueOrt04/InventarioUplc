const ReactivosSection = ({ reactivos, onViewCompleteInfo }) => {
  if (!reactivos.length) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay reactivos registrados</h3>
        <p className="mt-1 text-sm text-gray-500">No se encontraron reactivos en el inventario.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reactivos.map((reactivo, index) => (
        <ReactivoItem 
          key={`reactivo-${reactivo._id}`} 
          reactivo={reactivo} 
          index={index} 
          onViewCompleteInfo={onViewCompleteInfo}
        />
      ))}
    </div>
  );
};

const ReactivoItem = ({ reactivo, index, onViewCompleteInfo }) => (
  <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg">
    <input type="radio" name="reactivo-accordion" defaultChecked={index === 0} />
    
    <div className="collapse-title font-medium p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          {reactivo.imagenReactivo ? (
            <img
              src={reactivo.imagenReactivo}
              alt={reactivo.codigo}
              className="w-24 h-24 object-contain rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800">{reactivo.codigo}</h3>
            <p className="text-sm text-gray-600">{reactivo.nombre}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {reactivo.cantidad} unidades
          </span>
        </div>
      </div>
    </div>

    <div className="collapse-content bg-base-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
        <div className="flex flex-col md:flex-row gap-4 md:col-span-2">
          <div className="flex-1 flex flex-col items-center">
            <p className="text-gray-500 mb-2 text-lg">Imagen Reactivo</p>
            <img
              src={reactivo.imagenReactivo}
              alt={reactivo.codigo}
              className="w-full max-w-xs h-64 object-contain rounded-xl border-2 border-base-300 shadow-md"
            />
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="text-gray-500 mb-2 text-lg">Imagen Símbolo</p>
            <img
              src={reactivo.imagenSimbolo}
              alt={reactivo.codigo}
              className="w-full max-w-xs h-64 object-contain rounded-xl border-2 border-base-300 shadow-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-base-200 p-4 rounded-box">
            <p className="text-gray-500 text-lg">Fórmula</p>
            <p className="font-semibold text-xl">{reactivo.formula || 'N/A'}</p>
          </div>

          <div className="bg-base-200 p-4 rounded-box">
            <p className="text-gray-500 text-lg">Lote</p>
            <p className="font-semibold text-xl">{reactivo.numeroLote || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4">
          {reactivo.concentracion && (
            <div className="bg-base-200 p-4 rounded-box">
              <p className="text-gray-500 text-lg">Concentración</p>
              <p className="font-semibold text-xl">{reactivo.concentracion}</p>
            </div>
          )}

          {reactivo.descripcion && (
            <div className="bg-base-200 p-4 rounded-box">
              <p className="text-gray-500 text-lg">Descripción</p>
              <p className="text-lg text-gray-700">{reactivo.descripcion}</p>
            </div>
          )}
        </div>

        {/* Botón para visualizar información completa */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button 
            type="button"
            onClick={() => onViewCompleteInfo(reactivo)}
            className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Visualizar Información Completa
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ReactivosSection;
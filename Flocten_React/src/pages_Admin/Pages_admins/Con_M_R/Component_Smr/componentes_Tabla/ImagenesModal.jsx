const ImagenesModal = ({
  modalData,
  cerrarModal,
  cambiarImagen,
  getImageUrl,
}) => {
  const { imagenes, imagenActual, titulo } = modalData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">{titulo}</h3>
          <button
            onClick={cerrarModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col items-center">
          {imagenes.length > 0 ? (
            <img
              src={getImageUrl(imagenes[imagenActual])}
              alt={`Imagen ${imagenActual + 1}`}
              className="max-w-full max-h-96 object-contain rounded"
            />
          ) : (
            <p className="text-gray-500">No hay imágenes disponibles</p>
          )}

          {imagenes.length > 1 && (
            <div className="flex justify-between items-center mt-4 w-full px-4">
              <button
                onClick={() => cambiarImagen(-1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-600">
                {imagenActual + 1} / {imagenes.length}
              </span>
              <button
                onClick={() => cambiarImagen(1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagenesModal;

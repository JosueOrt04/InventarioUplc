const ImageUploadDevolucion = ({ 
  imagenesDevolucion, 
  uploadingImages, 
  onFileUpload, 
  onRemoveImage 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Evidencias de la Devolución (Opcional)
    </label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFileUpload(Array.from(e.target.files))}
        className="hidden"
        id="devolucion-files"
        disabled={uploadingImages}
      />
      <label
        htmlFor="devolucion-files"
        className={`cursor-pointer ${
          uploadingImages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-700"
        }`}
      >
        {uploadingImages
          ? "📤 Subiendo imágenes..."
          : "📷 Haga clic para subir imágenes"}
      </label>
      <p className="text-sm text-gray-500 mt-1">
        Puede subir múltiples imágenes del estado de los items (máximo 5MB por imagen)
      </p>
    </div>

    {imagenesDevolucion.length > 0 && (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Imágenes subidas ({imagenesDevolucion.length})
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {imagenesDevolucion.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Evidencia ${index + 1}`}
                className="w-full h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ImageUploadDevolucion;
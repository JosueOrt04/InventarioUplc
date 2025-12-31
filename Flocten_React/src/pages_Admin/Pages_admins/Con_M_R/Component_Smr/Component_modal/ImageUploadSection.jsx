const ImageUploadSection = ({ 
  imagenesPrestamo, 
  subiendoImagenes, 
  onImageUpload, 
  onRemoveImage 
}) => (
  <div>
    <label className="block text-sm font-medium text-primary-content mb-2">
      Evidencia Fotográfica del Préstamo
    </label>

    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onImageUpload(Array.from(e.target.files))}
        className="hidden"
        id="image-upload"
        disabled={subiendoImagenes}
      />
      <label htmlFor="image-upload" className="cursor-pointer block">
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">
            {subiendoImagenes ? "Subiendo imágenes..." : "Haz clic o arrastra imágenes aquí"}
          </span>
          <span className="text-xs text-gray-500">
            Formatos: JPG, PNG, GIF (Máx. 5MB por imagen)
          </span>
        </div>
      </label>
    </div>

    {imagenesPrestamo.length > 0 && (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Imágenes seleccionadas ({imagenesPrestamo.length})
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {imagenesPrestamo.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img.preview}
                alt={`Evidencia ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <p className="text-xs text-gray-500 truncate mt-1">{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ImageUploadSection;
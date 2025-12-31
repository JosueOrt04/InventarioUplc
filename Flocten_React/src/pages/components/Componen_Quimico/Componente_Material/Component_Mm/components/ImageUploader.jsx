import React from 'react';

const ImageUploader = ({ formData, uploadingImages, onImageUpload }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-base-content">Imágenes</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen Principal */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Imagen Principal</span>
          </label>
          <div className="flex items-center gap-4">
            {formData.imagenHerramienta && (
              <img
                src={formData.imagenHerramienta}
                alt="Herramienta"
                className="w-24 h-24 object-cover rounded-lg border-2 border-base-300"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageUpload(e.target.files[0], 'imagenHerramienta')}
              className="file-input file-input-bordered file-input-sm"
            />
          </div>
          {uploadingImages.imagenHerramienta && (
            <span className="loading loading-spinner loading-sm mt-2"></span>
          )}
        </div>

        {/* Imagen Adicional */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Imagen Adicional</span>
          </label>
          <div className="flex items-center gap-4">
            {formData.imagenAdicional && (
              <img
                src={formData.imagenAdicional}
                alt="Adicional"
                className="w-24 h-24 object-cover rounded-lg border-2 border-base-300"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageUpload(e.target.files[0], 'imagenAdicional')}
              className="file-input file-input-bordered file-input-sm"
            />
          </div>
          {uploadingImages.imagenAdicional && (
            <span className="loading loading-spinner loading-sm mt-2"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
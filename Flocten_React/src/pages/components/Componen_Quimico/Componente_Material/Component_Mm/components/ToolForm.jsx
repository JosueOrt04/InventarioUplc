import React from "react";
import NonEditableInfo from "./NonEditableInfo";
import ImageUploader from "./ImageUploader";

const ToolForm = ({
  formData,
  loading,
  uploadingImages,
  handleChange,
  handleSubmit,
  onImageUpload,
  onCancel,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Modificar Herramienta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <NonEditableInfo
            codigo={formData.codigo}
            createdAt={formData.createdAt}
          />

          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">
              Datos Básicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre del Producto</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tipo de Producto</span>
                </label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <ImageUploader
            formData={formData}
            uploadingImages={uploadingImages}
            onImageUpload={onImageUpload}
          />

          {/* Detalles del Producto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">
              Detalles del Producto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cantidad</span>
                </label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  className="input input-bordered"
                  min="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Estado</span>
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En Uso">En Uso</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Dañado">Dañado</option>
                  <option value="Perdido">Perdido</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Número de Lote</span>
                </label>
                <input
                  type="text"
                  name="numeroLote"
                  value={formData.numeroLote}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Opcional"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Número de Serie</span>
                </label>
                <input
                  type="text"
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="textarea textarea-bordered h-24"
                placeholder="Descripción detallada del producto..."
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Guardando...
                </span>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToolForm;

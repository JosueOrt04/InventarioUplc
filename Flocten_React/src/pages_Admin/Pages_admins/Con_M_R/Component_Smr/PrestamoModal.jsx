import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Hooks
import { usePrestamoData } from "./Component_modal/usePrestamoData";
import { useImageUpload } from "./Component_modal/useImageUpload";

// Components
import SelectField from "./Component_modal/SelectField";
import InputField from "./Component_modal/InputField";
import ImageUploadSection from "./Component_modal/ImageUploadSection";
import FormActions from "./Component_modal/FormActions";

const PrestamoModal = ({ onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    userId: "",
    tipoItem: "",
    itemId: "",
    cantidadPrestada: "",
    observaciones: "",
    diasPrestamo: 7,
    fechaDevolucion: "",
  });

  const [itemsDisponibles, setItemsDisponibles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // NUEVO ESTADO

  // Custom hooks
  const {
    usuarios,
    reactivos,
    herramientas,
    loading: loadingData,
  } = usePrestamoData();
  const {
    imagenesPrestamo,
    subiendoImagenes,
    handleImageUpload,
    handleRemoveImage,
    subirImagenesAlServidor,
    limpiarImagenes,
  } = useImageUpload();

  useEffect(() => {
    if (formData.tipoItem === "Reactivo") {
      setItemsDisponibles(reactivos);
    } else if (formData.tipoItem === "Herramienta") {
      setItemsDisponibles(herramientas);
    } else {
      setItemsDisponibles([]);
    }
    setFormData((prev) => ({ ...prev, itemId: "" }));
  }, [formData.tipoItem, reactivos, herramientas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "fechaDevolucion") {
        const hoy = new Date();
        const fechaDevolucion = new Date(value);
        const diferenciaMs = fechaDevolucion - hoy;
        const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
        updated.diasPrestamo = dias > 0 ? dias : 0;
      }
      return updated;
    });
  };

  const getCantidadDisponible = () => {
    if (!formData.itemId) return 0;
    const item = itemsDisponibles.find((item) => item._id === formData.itemId);
    return item ? parseFloat(item.cantidad) : 0;
  };

  const validateForm = () => {
    if (
      !formData.userId ||
      !formData.tipoItem ||
      !formData.itemId ||
      !formData.cantidadPrestada ||
      !formData.fechaDevolucion
    ) {
      toast.error("Por favor complete todos los campos obligatorios");
      return false;
    }

    const cantidad = parseFloat(formData.cantidadPrestada);
    const disponible = getCantidadDisponible();

    if (cantidad > disponible) {
      toast.error(
        `La cantidad solicitada (${cantidad}) excede la disponible (${disponible})`
      );
      return false;
    }

    if (formData.diasPrestamo <= 0) {
      toast.error("Seleccione una fecha de devolución válida");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Doble protección contra múltiples envíos
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true); // ACTIVAR ESTADO DE ENVÍO

    try {
      let imagenesUrls = [];
      if (imagenesPrestamo.length > 0) {
        imagenesUrls = await subirImagenesAlServidor();
      }

      await onConfirm({
        ...formData,
        cantidadPrestada: parseFloat(formData.cantidadPrestada),
        diasPrestamo: parseInt(formData.diasPrestamo),
        imagenesPrestamo: imagenesUrls,
      });

      limpiarImagenes();
      onClose(); // Cerrar modal después de éxito
    } catch (error) {
      console.error("Error en préstamo:", error);
      toast.error(error.message || "Error al registrar préstamo");
    } finally {
      setIsSubmitting(false); // ASEGURAR RESET EN FINALLY
    }
  };

  const handleCancel = () => {
    limpiarImagenes();
    onClose();
  };

  const cantidadDisponible = getCantidadDisponible();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-primary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-secondary-content p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Registrar Nuevo Préstamo</h2>
          <p className="text-blue-100">Complete la información del préstamo</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-base-100 rounded-xl">
          <SelectField
            label="Usuario"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {`${usuario.fullName} (#${usuario.controlNumber})`}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Tipo de Material"
            name="tipoItem"
            value={formData.tipoItem}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Reactivo">Reactivo</option>
            <option value="Herramienta">Herramienta</option>
          </SelectField>

          {formData.tipoItem && (
            <SelectField
              label={formData.tipoItem}
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
            >
              <option value="">
                Seleccionar {formData.tipoItem.toLowerCase()}
              </option>
              {itemsDisponibles.map((item) => (
                <option key={item._id} value={item._id}>
                  {`${item.nombre} - Disponible: ${item.cantidad} ${
                    item.unidad || "unidades"
                  }`}
                </option>
              ))}
            </SelectField>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Cantidad a Prestar"
              name="cantidadPrestada"
              value={formData.cantidadPrestada}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) handleChange(e);
              }}
              type="number"
              required
              min="1"
              step="1"
              max={cantidadDisponible}
              placeholder="Ej: 2"
              helperText={`Disponible: ${cantidadDisponible}`}
              onKeyDown={(e) => {
                if (["e", "E", ".", "+", "-"].includes(e.key))
                  e.preventDefault();
              }}
            />

            <InputField
              label="Fecha de Devolución"
              name="fechaDevolucion"
              value={formData.fechaDevolucion}
              onChange={handleChange}
              type="date"
              required={true}
              min={new Date().toISOString().split("T")[0]}
              helperText="Seleccione la fecha de devolución"
            />
          </div>

          {formData.fechaDevolucion && (
            <p className="text-sm text-success mt-1">
              📅 Días de préstamo calculados:{" "}
              <strong>{formData.diasPrestamo}</strong>
            </p>
          )}

          <ImageUploadSection
            imagenesPrestamo={imagenesPrestamo}
            subiendoImagenes={subiendoImagenes}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-base-content">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="3"
              className="w-full border-2 border-base-300 bg-base-100 rounded-lg px-4 py-3
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 hover:border-base-400 shadow-sm resize-none"
              placeholder="Observaciones adicionales sobre el préstamo..."
            />
          </div>

          <FormActions
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            loading={loadingData}
            subiendoImagenes={subiendoImagenes}
            isSubmitting={isSubmitting} // PASAR NUEVA PROP
          />
        </form>
      </div>
    </div>
  );
};

export default PrestamoModal;
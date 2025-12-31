import { useState } from "react";
import toast from "react-hot-toast";

// Hooks
import { useDevolucionData } from "./Component_Devolucion_modal/useDevolucionData";
import { useImageUploadDevolucion } from "./Component_Devolucion_modal/useImageUploadDevolucion";
import { useDevolucionValidation } from "./Component_Devolucion_modal/useDevolucionValidation";

// Components
import InformacionPrestamo from "./Component_Devolucion_modal/InformacionPrestamo";
import CantidadDevolver from "./Component_Devolucion_modal/CantidadDevolver";
import ObservacionesDevolucion from "./Component_Devolucion_modal/ObservacionesDevolucion";
import ImageUploadDevolucion from "./Component_Devolucion_modal/ImageUploadDevolucion";
import ResumenDevolucion from "./Component_Devolucion_modal/ResumenDevolucion";
import FormActionsDevolucion from "./Component_Devolucion_modal/FormActionsDevolucion";

const DevolucionModal = ({ prestamo, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // NUEVO ESTADO

  // Custom hooks
  const { formData, handleChange } = useDevolucionData(prestamo);
  const { uploadingImages, handleFileUpload, removeImage } =
    useImageUploadDevolucion();
  const { estado, validateForm, getResumenDevolucion } =
    useDevolucionValidation(prestamo, formData);

  const handleFileChange = async (files) => {
    await handleFileUpload(files, formData.imagenesDevolucion, (updater) => {
      if (typeof updater === "function") {
        handleChange({
          target: { name: "imagenesDevolucion", value: updater(formData) },
        });
      }
    });
  };

  const handleImageRemove = (index) => {
    removeImage(index, (updater) => {
      if (typeof updater === "function") {
        handleChange({
          target: { name: "imagenesDevolucion", value: updater(formData) },
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Doble protección contra múltiples envíos
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true); // ACTIVAR ESTADO DE ENVÍO

    try {
      console.log("📤 Enviando datos de devolución:", {
        prestamoId: prestamo._id,
        formData,
        imagenesCount: formData.imagenesDevolucion.length
      });

      await onConfirm(prestamo._id, {
        ...formData,
        cantidadDevuelta: parseFloat(formData.cantidadDevuelta),
      });
      
      console.log("✅ Devolución completada exitosamente");
      onClose(); // Cerrar modal después de éxito
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      toast.error(error.message || "Error al registrar devolución");
    } finally {
      setIsSubmitting(false); // ASEGURAR RESET EN FINALLY
    }
  };

  const resumen = getResumenDevolucion();
  const maxCantidad =
    prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Registrar Devolución</h2>
          <p className="text-green-100">
            Complete la información de la devolución
          </p>
        </div>

        {/* Información del Préstamo */}
        <InformacionPrestamo prestamo={prestamo} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cantidad a Devolver */}
          <CantidadDevolver
            cantidadDevuelta={formData.cantidadDevuelta}
            onChange={handleChange}
            maxCantidad={maxCantidad}
            estado={estado}
          />

          {/* Observaciones */}
          <ObservacionesDevolucion
            observaciones={formData.observaciones}
            onChange={handleChange}
          />

          {/* Subida de Imágenes */}
          <ImageUploadDevolucion
            imagenesDevolucion={formData.imagenesDevolucion}
            uploadingImages={uploadingImages}
            onFileUpload={handleFileChange}
            onRemoveImage={handleImageRemove}
          />

          {/* Resumen de la Devolución */}
          <ResumenDevolucion resumen={resumen} estado={estado} />

          {/* Botones */}
          <FormActionsDevolucion
            onCancel={onClose}
            onSubmit={handleSubmit}
            uploadingImages={uploadingImages}
            estado={estado}
            isSubmitting={isSubmitting} // PASAR NUEVA PROP
          />
        </form>
      </div>
    </div>
  );
};

export default DevolucionModal;
// hooks/useImageUploadDevolucion.js
import { useState } from "react";
import toast from "react-hot-toast";

export const useImageUploadDevolucion = () => {
  const [uploadingImages, setUploadingImages] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // ✅ CORRECCIÓN: URL sin espacio al final
      const response = await fetch(
        "http://localhost:5001/api/imagenes_prestamos/upload-prestamo/imagenes_devolucion", // ❌ SIN ESPACIO

        {
          method: "POST",
          body: formData,
          // ❌ IMPORTANTE: NO agregar manualmente Content-Type
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir imagen: ${response.status}`);
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  const handleFileUpload = async (files, currentImages, setFormData) => {
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`El archivo ${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`La imagen ${file.name} es demasiado grande (máximo 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploadingImages(true);

    try {
      const uploadPromises = validFiles.map((file) => uploadImage(file));
      const imageUrls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        imagenesDevolucion: [...(prev.imagenesDevolucion || []), ...imageUrls],
      }));

      toast.success(`${imageUrls.length} imagen(es) subida(s) correctamente`);
    } catch (error) {
      toast.error("Error al subir algunas imágenes");
      console.error("Error en handleFileUpload:", error);
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (indexToRemove, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      imagenesDevolucion: prev.imagenesDevolucion.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return {
    uploadingImages,
    handleFileUpload,
    removeImage,
  };
};

import { useState } from "react";
import { axiosInstance } from "../../../../../lib/axios";
import toast from "react-hot-toast";

export const useImageUpload = () => {
  const [imagenesPrestamo, setImagenesPrestamo] = useState([]);
  const [subiendoImagenes, setSubiendoImagenes] = useState(false);

  const handleImageUpload = async (files) => {
    setSubiendoImagenes(true);
    const nuevasImagenes = [];

    try {
      for (let file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`El archivo ${file.name} no es una imagen válida`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error(`La imagen ${file.name} es demasiado grande (máximo 5MB)`);
          continue;
        }

        const imageUrl = URL.createObjectURL(file);
        nuevasImagenes.push({
          file,
          preview: imageUrl,
          name: file.name,
        });
      }

      setImagenesPrestamo((prev) => [...prev, ...nuevasImagenes]);
      toast.success(`${nuevasImagenes.length} imagen(es) agregada(s)`);
    } catch (error) {
      console.error("Error procesando imágenes:", error);
      toast.error("Error al procesar las imágenes");
    } finally {
      setSubiendoImagenes(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImagenesPrestamo((prev) => {
      const nuevasImagenes = [...prev];
      URL.revokeObjectURL(nuevasImagenes[index].preview);
      nuevasImagenes.splice(index, 1);
      return nuevasImagenes;
    });
  };

  const subirImagenesAlServidor = async () => {
    if (imagenesPrestamo.length === 0) return [];

    const imagenesSubidas = [];
    try {
      for (let img of imagenesPrestamo) {
        const formData = new FormData();
        formData.append("image", img.file);

        const response = await axiosInstance.post(
          "/imagenes_prestamos/upload-prestamo/imagenes_prestamos", 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imagenesSubidas.push(response.data.imageUrl);
      }
      return imagenesSubidas;
    } catch (error) {
      console.error("Error subiendo imágenes:", error);
      throw new Error("Error al subir las imágenes");
    }
  };

  const limpiarImagenes = () => {
    imagenesPrestamo.forEach(img => URL.revokeObjectURL(img.preview));
    setImagenesPrestamo([]);
  };

  return {
    imagenesPrestamo,
    subiendoImagenes,
    handleImageUpload,
    handleRemoveImage,
    subirImagenesAlServidor,
    limpiarImagenes
  };
};
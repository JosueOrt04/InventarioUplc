import { toast } from "react-hot-toast";

export const subirImagen = async (
  file,
  fieldName,
  setUploadingImages,
  setFormData
) => {
  if (!file) return;

  setUploadingImages((prev) => ({ ...prev, [fieldName]: true }));

  try {
    // Ejemplo con Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tu_upload_preset");

    const response = await fetch(
      `http://localhost:5001/uploads/R_M/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setFormData((prev) => ({
      ...prev,
      [fieldName]: data.secure_url,
    }));

    toast.success("Imagen subida correctamente");
  } catch (error) {
    console.error("Error al subir imagen:", error);
    toast.error("Error al subir la imagen");
  } finally {
    setUploadingImages((prev) => ({ ...prev, [fieldName]: false }));
  }
};

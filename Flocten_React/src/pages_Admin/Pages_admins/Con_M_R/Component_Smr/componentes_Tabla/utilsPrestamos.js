export const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-ES");
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const baseUrl = "http://localhost:5001/";

  const cleanPath = imagePath.replace(/^\//, "");
  return `${baseUrl}/${cleanPath}`;
};

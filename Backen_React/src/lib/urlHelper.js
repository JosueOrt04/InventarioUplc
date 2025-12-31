// utils/urlHelper.js
export const buildImageUrl = (relativePath) => {
  if (!relativePath) return null;
  
  // Si ya es una URL completa, devolverla tal cual
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // Construir URL completa con el dominio actual
  const baseUrl = process.env.BASE_URL || 'https://polar-saint-gratis-string.trycloudflare.com';
  return `${baseUrl}${relativePath}`;
};

// Para usar en tus controladores o frontend
export const getFullImageUrl = (imagePath) => {
  return buildImageUrl(imagePath);
};
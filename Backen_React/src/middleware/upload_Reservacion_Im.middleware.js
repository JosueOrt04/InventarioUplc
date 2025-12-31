import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/Imagen_Reservas/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `recepcion_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo imágenes JPG/PNG permitidas'));
    }
  }
});
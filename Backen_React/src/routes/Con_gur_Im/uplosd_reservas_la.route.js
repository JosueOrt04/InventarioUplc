import multer from "multer";
import path from "path";
import fs from "fs";

// Función para crear directorios
const ensureDir = (dirPath) => fs.mkdirSync(dirPath, { recursive: true });

// Configuración para RECEPCIÓN
export const uploadRecepcion = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(process.cwd(), "Imagen_Reservas/reservas_prestamos");
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `recepcion_${unique}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"), false);
  },
});

// Configuración para DEVOLUCIÓN
export const uploadDevolucion = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(process.cwd(), "Imagen_Reservas/Reservas_devoluciones");
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const reservaId = req.params.id; // IMPORTANTE: Usa el ID de la URL
      const unique = Date.now();
      cb(null, `devolucion_${reservaId}_${unique}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"), false);
  },
});
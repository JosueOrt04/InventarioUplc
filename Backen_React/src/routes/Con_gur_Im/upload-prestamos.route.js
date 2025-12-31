import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// ⬇️ CONFIGURAR DOTENV AL INICIO
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;

// ⬇️ VALIDAR QUE BASE_URL EXISTA
if (!BASE_URL) {
  console.error("❌ ERROR: BASE_URL no está definido en el archivo .env");
  process.exit(1);
}

const router = express.Router();

const getStorage = (tipo) =>
  multer.diskStorage({
    destination(req, file, cb) {
      const folderPath = path.join(
        __dirname,
        `../../RH_RH_uploads/prestamos/${tipo}_Imagenes`
      );
      cb(null, folderPath);
    },
    filename(req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

// =================== PRESTAMOS ===================
const uploadPrestamos = multer({ storage: getStorage("Prestamos") });

router.post(
  "/upload-prestamo/imagenes_prestamos",
  uploadPrestamos.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió ningún archivo" });
    }

    const relativePath = `/RH_RH_uploads/prestamos/Prestamos_Imagenes/${req.file.filename}`;

    res.json({
      imageUrl: BASE_URL + relativePath,
      relativePath,
    });
  }
);

// =================== DEVOLUCIONES ===================
const uploadDevoluciones = multer({ storage: getStorage("Devolucion") });

router.post(
  "/upload-prestamo/imagenes_devolucion",
  uploadDevoluciones.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió ningún archivo" });
    }

    const relativePath = `/RH_RH_uploads/prestamos/Devolucion_Imagenes/${req.file.filename}`;

    res.json({
      imageUrl: BASE_URL + relativePath,
      relativePath,
    });
  }
);

export default router;
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ⬇️ AÑADIR CONFIGURACIÓN DE DOTENV
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/profile-pics"));
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  // ⬇️ USANDO BASE_URL DEL .env
  const fileUrl = `${BASE_URL}/uploads/profile-pics/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

export default router;
import multer from "multer";
import path from "path";
import fs from "fs";

const storageRecepcion = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads/reservas");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "recepcion_" + unique + path.extname(file.originalname));
  },
});

export default multer({ storage: storageRecepcion });


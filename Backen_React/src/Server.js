import dotenv from "dotenv"; 
import fs from "fs";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

/*<--Importación de rutas-->*/
import authRoutes from "./routes/Control_Multi_opciones/auth.route.js";
import router from "./routes/Control_RM/Registro.route.js";
import uploadRoute from "./routes/Con_gur_Im/upload.route.js";
import lisRoutes from "./routes/Control_RM/listado.route.js";
import upUser from "./routes/Con_gur_Im/uploadUsei.route.js";
import upImag from "./routes/Con_gur_Im/user.route.js";
import userRoutes from "./routes/Con_gur_Im/users.route.js";

import uploadPrestamosRouter from "./routes/Con_gur_Im/upload-prestamos.route.js";

import admin_auth from "./routes/Control_Multi_opciones/admin_auth.route.js";
import AdminContro from "./routes/Control_RM/AdminContro.route.js";
import Control_aprtado from "./routes/Control_RM/Control_aprtado.route.js";

import { iniciarReservasAutomaticamente } from "./controller/Control_reserva/cronJobs.js";

import { execSync } from "child_process";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// ----------------------------------------------------
// 🔎 Verificar si la BASE_URL cambió y actualizar URLs
// ----------------------------------------------------
try {
  console.log("🔎 Verificando si BASE_URL cambió...");
  execSync("node ./src/scripts/updateImageUrls.js", { stdio: "inherit" });
} catch (err) {
  console.error("❌ Error al ejecutar updateImageUrls.js:", err.message);
}

const clearCache = async () => {
  const modulePath = fileURLToPath(import.meta.url);
  const moduleDir = path.dirname(modulePath);

  for (const key of Object.keys(import.meta.resolve)) {
    if (key.startsWith(moduleDir)) {
      delete import.meta.resolve[key];
    }
  }
};

await clearCache();
console.log("🧹 Caché limpiada antes de iniciar el servidor");

const PORT = process.env.PORT;

// Obtener el directorio raíz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

iniciarReservasAutomaticamente();

// ✅ JSON grande
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Orígenes permitidos
const allowedOrigins = ["https://weighted-gaps-sip-adams.trycloudflare.com", 
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

     
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/RH_RH_uploads", express.static(path.join(__dirname, "RH_RH_uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Imagen_Reservas", express.static(path.join(process.cwd(), "Imagen_Reservas")));

// Rutas del sistema
app.use("/api/auth", authRoutes);
app.use("/api", router);
app.use("/api", uploadRoute);
app.use("/api/usuario", upUser, upImag);
app.use("/api/list", lisRoutes);
app.use("/api/usuario/Permiss", userRoutes);
app.use("/api/admin", admin_auth);
app.use("/api/AdminContro", AdminContro);
app.use("/api/imagenes_prestamos", uploadPrestamosRouter);
app.use("/api/reservas_laboratorio", Control_aprtado);

// Crear directorios
const directories = [
  "uploads",
  "uploads/profile-pics",
  "uploads/R_M",
  "RH_RH_uploads",
  "RH_RH_uploads/prestamos/Prestamos_Imagenes",
  "RH_RH_uploads/prestamos/Devolucion_Imagenes",
  "Imagen_Reservas",
];

directories.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
   
  }
});

server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});

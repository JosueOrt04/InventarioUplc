// controllers/user.controller.js

import User from "../../models/user.model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Workaround para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se proporcionó ninguna imagen" });
    }

    // Eliminar la imagen anterior si existe
    if (user.profilePic) {
      // Asumiendo que la ruta guardada es relativa al proyecto (ej: /uploads/profile-pics/...)
      // __dirname apunta al directorio 'controllers', así que subimos un nivel.
      const oldImagePath = path.join(__dirname, "..", user.profilePic);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Guardar la nueva imagen (ruta relativa)
    const imagePath = `/uploads/profile-pics/${req.file.filename}`;
    user.profilePic = imagePath;
    await user.save();

    res.status(200).json({
      message: "Imagen de perfil actualizada correctamente",
      profilePic: imagePath,
    });
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
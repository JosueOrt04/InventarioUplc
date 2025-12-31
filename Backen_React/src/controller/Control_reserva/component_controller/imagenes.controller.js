import fs from "fs";
import path from "path";
import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

// Subir imagen de recepción
export const subirImagenRecepcion = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No se subió imagen" });

    if (reserva.imagenRecepcion) {
      const oldPath = path.join(process.cwd(), reserva.imagenRecepcion);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const tempPath = req.files[0].path;
    const ext = path.extname(tempPath);
    const finalName = `recepcion_${id}_${Date.now()}${ext}`;
    const finalPath = path.join(process.cwd(), "/Imagen_Reservas/reservas_prestamos", finalName);

    fs.mkdirSync(path.dirname(finalPath), { recursive: true });
    fs.renameSync(tempPath, finalPath);

    reserva.imagenRecepcion = `/Imagen_Reservas/reservas_prestamos/${finalName}`;
    await reserva.save();

    res.json({ mensaje: "Imagen guardada", imagenPath: reserva.imagenRecepcion });

  } catch (error) {
    if (req.files?.length) fs.unlinkSync(req.files[0].path);
    res.status(500).json({ error: error.message });
  }
};

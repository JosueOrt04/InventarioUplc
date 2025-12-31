import fs from "fs";
import path from "path";
import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

export const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    if (reserva.estado === "en_uso")
      return res.status(400).json({ error: "No se puede eliminar una reserva en uso" });

    const imagenes = ["imagenRecepcion", "imagenDevolucion"];
    imagenes.forEach(img => {
      if (reserva[img]) {
        const imgPath = path.join(process.cwd(), reserva[img]);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
    });

    await ReservaLaboratorio.findByIdAndDelete(id);
    res.json({ mensaje: "Reserva eliminada" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

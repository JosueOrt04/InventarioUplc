import path from "path";
import fs from "fs";
import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

// estados.controller.js
export const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { razonCancelacion } = req.body;
    const userId = req.user.id; // Asumiendo que tienes el usuario en req.user

    if (!razonCancelacion?.trim())
      return res
        .status(400)
        .json({ error: "La razón de cancelación es obligatoria" });

    const reserva = await ReservaLaboratorio.findById(id);
    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });
    
    // ✅ Verificar que el usuario es el dueño de la reserva
    if (reserva.asesorId.toString() !== userId) {
      return res.status(403).json({ error: "No tienes permiso para cancelar esta reserva" });
    }

    if (reserva.estado === "finalizado")
      return res
        .status(400)
        .json({ error: "No se puede cancelar una reserva finalizada" });

    reserva.estado = "cancelado";
    reserva.razonCancelacion = razonCancelacion;
    await reserva.save();

    res.json({ mensaje: "Reserva cancelada", reserva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const iniciarUso = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const reserva = await ReservaLaboratorio.findById(id);
    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });

    // ✅ Verificar que el usuario es el dueño de la reserva
    if (reserva.asesorId.toString() !== userId) {
      return res.status(403).json({ error: "No tienes permiso para iniciar esta reserva" });
    }

    if (reserva.estado !== "reservado")
      return res
        .status(400)
        .json({ error: "Solo reservas en estado 'reservado'" });

    reserva.estado = "en_uso";
    await reserva.save();

    res.json({ mensaje: "Uso iniciado", reserva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finalizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });

    // ✅ Verificar que el usuario es el dueño de la reserva
    if (reserva.asesorId.toString() !== userId) {
      return res.status(403).json({ error: "No tienes permiso para finalizar esta reserva" });
    }

   if (!["en_uso", "tiempo_finalizado"].includes(reserva.estado))
  return res.status(400).json({ error: "Solo reservas en uso o con tiempo finalizado" });
    let imagenDevolucionPath = "";
    if (req.file) {
      if (reserva.imagenDevolucion) {
        const oldPath = path.join(process.cwd(), reserva.imagenDevolucion);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const tempPath = req.file.path;
      const ext = path.extname(tempPath);
      const name = `devolucion_${id}_${Date.now()}${ext}`;
      const finalPath = path.join(
        process.cwd(),
        "Imagen_Reservas/Reservas_devoluciones",
        name
      );

      fs.mkdirSync(path.dirname(finalPath), { recursive: true });
      fs.renameSync(tempPath, finalPath);
      imagenDevolucionPath = `Imagen_Reservas/Reservas_devoluciones/${name}`;
    }

    reserva.estado = "finalizado";
    reserva.imagenDevolucion = imagenDevolucionPath;
    reserva.comentarioDevolucion = req.body.comentarioDevolucion || "";

    await reserva.save();
    res.json({ mensaje: "Reserva finalizada", reserva });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: error.message });
  }
};

export const marcarNotificado = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await ReservaLaboratorio.findByIdAndUpdate(
      id,
      { notificado: true },
      { new: true }
    );

    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });

    res.json({ mensaje: "Notificado", reserva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

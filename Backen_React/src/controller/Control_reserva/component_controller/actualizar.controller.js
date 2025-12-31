import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

export const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reservaActual = await ReservaLaboratorio.findById(id);
    if (!reservaActual) return res.status(404).json({ error: "Reserva no encontrada" });

    // 1. No se toca si ya está en uso o finalizada
    if (["en_uso", "finalizado"].includes(reservaActual.estado))
      return res.status(400).json({ error: "No se puede modificar esta reserva" });

    // 2. ¿Se cambia algo crítico?
    const cambiaHorarioCrítico =
      req.body.fechaReserva ||
      req.body.laboratorio   ||
      req.body.horaInicio    ||
      req.body.horaFin;

    if (cambiaHorarioCrítico) {
      const conflicto = await ReservaLaboratorio.findOne({
        _id: { $ne: id },
        laboratorio: req.body.laboratorio || reservaActual.laboratorio,
        fechaReserva: req.body.fechaReserva
          ? new Date(req.body.fechaReserva)
          : reservaActual.fechaReserva,
        estado: { $ne: "cancelado" },
        $or: [
          {
            horaInicio: { $lte: req.body.horaInicio || reservaActual.horaInicio },
            horaFin:   { $gt:  req.body.horaInicio || reservaActual.horaInicio },
          },
          {
            horaInicio: { $lt:  req.body.horaFin || reservaActual.horaFin },
            horaFin:   { $gte: req.body.horaFin || reservaActual.horaFin },
          },
        ],
      });

      if (conflicto)
        return res.status(409).json({ error: "Choque de horario", conflicto });
    }

    // 3. Campos que no queremos que se puedan editar
    const datosActualizados = { ...req.body };
    delete datosActualizados.estado;
    delete datosActualizados.asesorId;
    delete datosActualizados.controlNumberAsesor;
    delete datosActualizados.nombreAsesor;
    delete datosActualizados.imagenAsesor;

    const reservaActualizada = await ReservaLaboratorio.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    ).populate("asesorId", "controlNumber fullName role");

    res.json({ mensaje: "Reserva actualizada", reserva: reservaActualizada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
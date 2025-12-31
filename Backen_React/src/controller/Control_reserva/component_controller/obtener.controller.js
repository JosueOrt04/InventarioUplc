import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

export const obtenerReservas = async (req, res) => {
  try {
    const { 
      laboratorio, 
      fechaReserva, 
      turno, 
      estado, 
      asesorId, 
      page = 1, 
      limit = 5  // ✅ Aumentar a 10 registros por página
    } = req.query;

    const filtros = {};
    
    // ✅ Filtro de laboratorio
    if (laboratorio) filtros.laboratorio = laboratorio;
    
    // ✅ CORREGIDO: Filtro de fecha - buscar por fecha exacta sin conversión a Date
if (fechaReserva && !isNaN(Date.parse(fechaReserva))) {
  const startDate = new Date(fechaReserva);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  filtros.fechaReserva = {
    $gte: startDate,
    $lt: endDate
  };
}
    
    if (turno) filtros.turno = turno;
    if (estado) filtros.estado = estado;
    if (asesorId) filtros.asesorId = asesorId;

    // ✅ Convertir a números para evitar problemas
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const reservas = await ReservaLaboratorio.find(filtros)
      .populate("asesorId", "controlNumber fullName role")
      .sort({ fechaReserva: -1, horaInicio: 1 })
      .limit(limitNum)
      .skip(skip);

    const total = await ReservaLaboratorio.countDocuments(filtros);

    res.json({
      reservas,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      total,
      itemsPerPage: limitNum
    });

  } catch (error) {
    console.error('❌ Error en obtenerReservas:', error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await ReservaLaboratorio.findById(req.params.id)
      .populate("asesorId", "controlNumber fullName role");

    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(reserva);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

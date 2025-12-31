import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

// Obtener horarios ocupados
export const getHorariosOcupados = async (req, res) => {
  try {
    const { laboratorio, fecha } = req.query;
    
const reservas = await ReservaLaboratorio.find({
  laboratorio,
  fechaReserva: new Date(fecha),
  estado: { $ne: "cancelado" },
}).select("horaInicio horaFin laboratorio nombreAsesor estado razonCancelacion");

    res.json({ horarios: reservas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

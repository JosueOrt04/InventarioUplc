import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

// controllers/consultas.controller.js
export const consultarDisponibilidad = async (req, res) => {
  try {
    const { laboratorio, fecha } = req.params;

    console.log("🔍 Consultando disponibilidad:", { laboratorio, fecha });

    // Validar parámetros
    if (!laboratorio || !fecha) {
      return res.status(400).json({ 
        error: "Laboratorio y fecha son requeridos" 
      });
    }

    // IMPORTANTE: Parsear la fecha correctamente considerando UTC
    const fechaConsulta = new Date(fecha);
    fechaConsulta.setUTCHours(0, 0, 0, 0); // Establecer a inicio del día en UTC

    if (isNaN(fechaConsulta.getTime())) {
      return res.status(400).json({ 
        error: "Formato de fecha inválido" 
      });
    }

    // Crear rango de fechas considerando zona horaria
    const fechaInicio = new Date(fechaConsulta);
    fechaInicio.setUTCHours(0, 0, 0, 0);
    
    const fechaFin = new Date(fechaConsulta);
    fechaFin.setUTCHours(23, 59, 59, 999);

    console.log("📅 Rango de búsqueda:", {
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString()
    });

    // Buscar reservas activas (incluyendo 'en_uso' y 'reservado')
    const reservas = await ReservaLaboratorio.find({
      laboratorio,
      fechaReserva: {
        $gte: fechaInicio,
        $lte: fechaFin
      },
      estado: { $nin: ["cancelado", "finalizado"] } // Excluir canceladas y finalizadas
    })
    .select("horaInicio horaFin materia estado nombreAsesor fechaReserva")
    .sort({ horaInicio: 1 });

    console.log(`📊 Encontradas ${reservas.length} reservas activas`);
    
    // Formatear respuesta con más detalles
    const ocupados = reservas.map(r => ({
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
      materia: r.materia,
      estado: r.estado,
      nombreAsesor: r.nombreAsesor,
      fechaReserva: r.fechaReserva ? r.fechaReserva.toISOString().split('T')[0] : null
    }));

    // Mostrar en consola para debugging
    console.log("📋 Reservas encontradas:");
    ocupados.forEach((r, i) => {
      console.log(`${i + 1}. ${r.horaInicio} - ${r.horaFin} (${r.estado}) - ${r.materia}`);
    });

    // Generar horarios libres (7:00 a 22:00)
    const libres = [];
    const horariosOcupados = reservas
      .map(r => ({ inicio: r.horaInicio, fin: r.horaFin }))
      .sort((a, b) => a.inicio.localeCompare(b.inicio));

    let horaActual = "07:00";
    const finJornada = "22:00";

    horariosOcupados.forEach(ocupado => {
      if (horaActual < ocupado.inicio) {
        libres.push({
          horaInicio: horaActual,
          horaFin: ocupado.inicio
        });
      }
      horaActual = ocupado.fin;
    });

    // Último horario libre
    if (horaActual < finJornada) {
      libres.push({
        horaInicio: horaActual,
        horaFin: finJornada
      });
    }

    const respuesta = {
      fecha: fechaConsulta.toISOString().split('T')[0],
      laboratorio,
      ocupados,
      libres,
      totalOcupados: ocupados.length,
      totalLibres: libres.length,
      detalles: {
        en_uso: ocupados.filter(r => r.estado === "en_uso").length,
        reservado: ocupados.filter(r => r.estado === "reservado").length,
        cancelado: 0 // Se excluyen del query
      }
    };

    console.log("✅ Disponibilidad calculada:", {
      fecha: respuesta.fecha,
      ocupados: respuesta.totalOcupados,
      en_uso: respuesta.detalles.en_uso,
      reservado: respuesta.detalles.reservado
    });

    res.json(respuesta);

  } catch (error) {
    console.error("❌ Error en consultarDisponibilidad:", error);
    res.status(500).json({ 
      error: "Error interno del servidor",
      detalle: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
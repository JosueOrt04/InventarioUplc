import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";

// reportes.controller.js - Versión mejorada
export const reporteOcupacion = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, laboratorio } = req.query;

   
    // ✅ Validaciones mejoradas
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ 
        error: "Los parámetros fechaInicio y fechaFin son obligatorios" 
      });
    }

    // ✅ Ajustar fechas para incluir todo el día
    const inicio = new Date(fechaInicio);
    inicio.setHours(0, 0, 0, 0);
    
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    if (inicio > fin) {
      return res.status(400).json({ 
        error: "fechaInicio no puede ser mayor que fechaFin" 
      });
    }

    // ✅ Construir filtros
    const filtros = {
      fechaReserva: { 
        $gte: inicio, 
        $lte: fin 
      },
      estado: { 
        $nin: ["cancelado"] // ✅ Excluir solo cancelados
      }
    };

    if (laboratorio && laboratorio !== "") {
      filtros.laboratorio = laboratorio;
    }

   

    // ✅ Obtener reservas con población correcta
    const reservas = await ReservaLaboratorio.find(filtros)
      .populate("asesorId", "controlNumber fullName email")
      .sort({ fechaReserva: 1, horaInicio: 1 })
      .lean();

   

    // ✅ Cálculo de días laborables (excluyendo fines de semana)
    const getDiasLaborables = (start, end) => {
      let count = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) { // Excluir domingo (0) y sábado (6)
          count++;
        }
        current.setDate(current.getDate() + 1);
      }
      return count;
    };

    const diasLaborables = getDiasLaborables(inicio, fin);
    const totalDias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;

    // ✅ Estadísticas mejoradas
    const estadisticas = {
      periodo: {
        fechaInicio: inicio.toISOString().split('T')[0],
        fechaFin: fin.toISOString().split('T')[0],
        totalDias,
        diasLaborables
      },
      totalReservas: reservas.length,
      porLaboratorio: {},
      porTurno: { AM: 0, PM: 0, NT: 0 },
      porEstado: {
        reservado: 0,
        en_uso: 0,
        tiempo_finalizado: 0,
        finalizado: 0,
        cancelado: 0
      },
      porAsesor: {},
      horariosUtilizados: {}
    };

    // ✅ Procesar cada reserva
    reservas.forEach(reserva => {
      const { laboratorio, turno, estado, asesorId, horaInicio, horaFin } = reserva;
      
      // Por laboratorio
      estadisticas.porLaboratorio[laboratorio] = 
        (estadisticas.porLaboratorio[laboratorio] || 0) + 1;
      
      // Por turno
      if (turno && estadisticas.porTurno[turno] !== undefined) {
        estadisticas.porTurno[turno]++;
      }
      
      // Por estado
      if (estado && estadisticas.porEstado[estado] !== undefined) {
        estadisticas.porEstado[estado]++;
      }
      
      // Por asesor
      const nombreAsesor = asesorId?.fullName || reserva.nombreAsesor || "Sin asignar";
      estadisticas.porAsesor[nombreAsesor] = 
        (estadisticas.porAsesor[nombreAsesor] || 0) + 1;
      
      // Horarios utilizados
      const horarioKey = `${horaInicio}-${horaFin}`;
      estadisticas.horariosUtilizados[horarioKey] = 
        (estadisticas.horariosUtilizados[horarioKey] || 0) + 1;
    });

    // ✅ Cálculo REAL de ocupación
    // Considerar: 3 laboratorios × 3 turnes por día × días laborables
    const capacidadMaxima = 3 * 3 * diasLaborables; // 3 labs × 3 turnes × días
    const ocupacionReal = reservas.length;
    
    estadisticas.porcentajeOcupacion = capacidadMaxima > 0 
      ? ((ocupacionReal / capacidadMaxima) * 100).toFixed(2)
      : "0.00";

    estadisticas.metricasOcupacion = {
      capacidadMaxima,
      ocupacionReal,
      porcentaje: `${estadisticas.porcentajeOcupacion}%`,
      diasAnalizados: totalDias,
      diasLaborables
    };



    res.json({
      periodo: estadisticas.periodo,
      estadisticas,
      reservas: reservas.map(r => ({
        ...r,
        // ✅ Asegurar que asesorId tenga la estructura esperada
        asesorId: r.asesorId || {
          _id: null,
          controlNumber: r.controlNumberAsesor,
          fullName: r.nombreAsesor
        }
      })),
      resumen: {
        totalReservas: reservas.length,
        laboratorios: Object.keys(estadisticas.porLaboratorio).length,
        asesores: Object.keys(estadisticas.porAsesor).length
      }
    });

  } catch (error) {
    console.error('❌ Error en reporteOcupacion:', error);
    res.status(500).json({ 
      error: "Error al generar el reporte de ocupación",
      detalle: error.message 
    });
  }
};
import ReservaLaboratorio from "../../models/reservaLaboratorio.model.js";
import User from "../../models/user.model.js";
import path from "path";
import fs from "fs";

// ============================
// CRUD BÁSICO
// ============================

// Control_aprtado.controller.js

// 🔹 NUEVO ENDPOINT: Obtener horarios ocupados
export const getHorariosOcupados = async (req, res) => {
  try {
    const { laboratorio, fecha } = req.query;
    
    const reservas = await ReservaLaboratorio.find({
      laboratorio,
      fechaReserva: new Date(fecha),
      estado: { $ne: "cancelado" },
    }).select("horaInicio horaFin laboratorio");

    res.json({ horarios: reservas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearReserva = async (req, res) => {
  try {
    const {
      asesorId,
      laboratorio,
      fechaReserva,
      horaInicio,
      horaFin,
      turno,
      materia,
      numeroAlumnos,
      equiposSolicitados,
      observacionRecepcion,
    } = req.body;

    // Validar asesor
    const asesor = await User.findById(asesorId);
    if (!asesor) {
      return res.status(404).json({ error: "Asesor no encontrado" });
    }

    // ✅ OBTIENE LOS DATOS REALES DEL USUARIO AUTENTICADO
    const controlNumberAsesor = asesor.controlNumber;
    const nombreAsesor = asesor.fullName;
    const imagenAsesor = asesor.profilePic;

    // Validar horas
    const inicio = new Date(`2000-01-01T${horaInicio}:00`);
    const fin = new Date(`2000-01-01T${horaFin}:00`);
    const duracion = (fin - inicio) / 60000;

    if (duracion <= 0) {
      return res
        .status(400)
        .json({ error: "Hora de fin debe ser mayor a la de inicio" });
    }

    // 🔹 VERIFICACIÓN DE CONFLICTOS MEJORADA
    const conflicto = await ReservaLaboratorio.findOne({
      laboratorio,
      fechaReserva: new Date(fechaReserva),
      estado: { $ne: "cancelado" },
      $or: [
        // Caso 1: Inicio dentro de otra reserva
        { horaInicio: { $lte: horaInicio }, horaFin: { $gt: horaInicio } },
        // Caso 2: Fin dentro de otra reserva
        { horaInicio: { $lt: horaFin }, horaFin: { $gte: horaFin } },
        // Caso 3: Reserva que envuelve completamente otra
        { horaInicio: { $gte: horaInicio }, horaFin: { $lte: horaFin } },
        // Caso 4: Reserva completamente dentro de otra
        { horaInicio: { $lte: horaInicio }, horaFin: { $gte: horaFin } },
      ],
    });

    if (conflicto) {
      return res.status(409).json({
        error: "❌ Horario no disponible - Ya existe una reserva activa",
        conflicto: {
          horaInicio: conflicto.horaInicio,
          horaFin: conflicto.horaFin,
          laboratorio: conflicto.laboratorio,
          mensaje: "Este horario ya está reservado. Solo se permiten reservas en horarios cancelados.",
        },
      });
    }

    // Guardar imagen de recepción
    let imagenRecepcionPath = "";
    if (req.file) {
      imagenRecepcionPath = `/uploads/reservas/${req.file.filename}`;
    }

    const nuevaReserva = new ReservaLaboratorio({
      asesorId,
      controlNumberAsesor,
      nombreAsesor,
      imagenAsesor,
      laboratorio,
      fechaReserva,
      horaInicio,
      horaFin,
      turno,
      materia,
      numeroAlumnos,
      equiposSolicitados: Array.isArray(equiposSolicitados)
        ? equiposSolicitados
        : [equiposSolicitados].filter(Boolean),
      observacionRecepcion,
      imagenRecepcion: imagenRecepcionPath,
    });

    await nuevaReserva.save();
    await nuevaReserva.populate(
      "asesorId",
      "controlNumber fullName role profilePic"
    );

    res.status(201).json({
      mensaje: "✅ Reserva creada exitosamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: "⚠️ Conflicto de horario detectado por índice único",
        detalles: "Este horario ya está registrado en el sistema"
      });
    }
    res
      .status(500)
      .json({ error: "Error al crear reserva", detalles: error.message });
  }
};
// NUEVO: Subir imagen de recepción después de crear la reserva
export const subirImagenRecepcion = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    // Eliminar imagen anterior si existe
    if (reserva.imagenRecepcion) {
      const oldPath = path.join(process.cwd(), reserva.imagenRecepcion);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Renombrar archivo
    const tempPath = req.files[0].path;
    const ext = path.extname(tempPath);
    const finalName = `recepcion_${id}_${Date.now()}${ext}`;
    const finalPath = path.join(process.cwd(), "uploads/reservas", finalName);

    fs.mkdirSync(path.dirname(finalPath), { recursive: true });
    fs.renameSync(tempPath, finalPath);

    reserva.imagenRecepcion = `/uploads/reservas/${finalName}`;
    await reserva.save();

    res.json({
      mensaje: "Imagen de recepción guardada",
      imagenPath: reserva.imagenRecepcion,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      fs.unlinkSync(req.files[0].path);
    }
    res
      .status(500)
      .json({ error: "Error al subir imagen", detalles: error.message });
  }
};

export const obtenerReservas = async (req, res) => {
  try {
    const {
      laboratorio,
      fechaReserva,
      turno,
      estado,
      asesorId,
      page = 1,
      limit = 10,
    } = req.query;

    const filtros = {};
    if (laboratorio) filtros.laboratorio = laboratorio;
    if (fechaReserva) filtros.fechaReserva = new Date(fechaReserva);
    if (turno) filtros.turno = turno;
    if (estado) filtros.estado = estado;
    if (asesorId) filtros.asesorId = asesorId;

    const reservas = await ReservaLaboratorio.find(filtros)
      .populate("asesorId", "controlNumber fullName role")
      .sort({ fechaReserva: -1, horaInicio: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ReservaLaboratorio.countDocuments(filtros);

    res.json({
      reservas,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener reservas", detalles: error.message });
  }
};

export const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await ReservaLaboratorio.findById(req.params.id).populate(
      "asesorId",
      "controlNumber fullName role"
    );

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener reserva", detalles: error.message });
  }
};

export const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaActual = await ReservaLaboratorio.findById(id);

    if (!reservaActual) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (["en_uso", "finalizado"].includes(reservaActual.estado)) {
      return res.status(400).json({
        error: "No se puede modificar una reserva activa o finalizada",
      });
    }

    // Verificar conflictos si cambia horario/lab/fecha
    const cambiaHorario =
      req.body.horaInicio ||
      req.body.horaFin ||
      req.body.fechaReserva ||
      req.body.laboratorio;
    if (cambiaHorario) {
      const conflicto = await ReservaLaboratorio.findOne({
        _id: { $ne: id },
        laboratorio: req.body.laboratorio || reservaActual.laboratorio,
        fechaReserva: req.body.fechaReserva
          ? new Date(req.body.fechaReserva)
          : reservaActual.fechaReserva,
        estado: { $ne: "cancelado" },
        $or: [
          {
            horaInicio: {
              $lte: req.body.horaInicio || reservaActual.horaInicio,
            },
            horaFin: { $gt: req.body.horaInicio || reservaActual.horaInicio },
          },
          {
            horaInicio: { $lt: req.body.horaFin || reservaActual.horaFin },
            horaFin: { $gte: req.body.horaFin || reservaActual.horaFin },
          },
        ],
      });

      if (conflicto) {
        return res
          .status(409)
          .json({ error: "El nuevo horario genera conflicto", conflicto });
      }
    }

    const reservaActualizada = await ReservaLaboratorio.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("asesorId", "controlNumber fullName role");

    res.json({
      mensaje: "Reserva actualizada exitosamente",
      reserva: reservaActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar reserva", detalles: error.message });
  }
};

export const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reserva.estado === "en_uso") {
      return res
        .status(400)
        .json({ error: "No se puede eliminar una reserva en uso" });
    }

    // Eliminar archivos asociados
    if (reserva.imagenRecepcion) {
      const imgPath = path.join(process.cwd(), reserva.imagenRecepcion);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    if (reserva.imagenDevolucion) {
      const imgPath = path.join(process.cwd(), reserva.imagenDevolucion);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await ReservaLaboratorio.findByIdAndDelete(id);
    res.json({ mensaje: "Reserva eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar reserva", detalles: error.message });
  }
};

// ============================
// GESTIÓN DE ESTADO
// ============================

export const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { razonCancelacion } = req.body;

    if (!razonCancelacion?.trim()) {
      return res
        .status(400)
        .json({ error: "La razón de cancelación es obligatoria" });
    }

    const reserva = await ReservaLaboratorio.findById(id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reserva.estado === "finalizado") {
      return res
        .status(400)
        .json({ error: "No se puede cancelar una reserva finalizada" });
    }

    reserva.estado = "cancelado";
    reserva.razonCancelacion = razonCancelacion;
    await reserva.save();

    res.json({ mensaje: "Reserva cancelada exitosamente", reserva });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al cancelar reserva", detalles: error.message });
  }
};

export const iniciarUso = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reserva.estado !== "reservado") {
      return res.status(400).json({
        error: "Solo se puede iniciar una reserva en estado 'reservado'",
      });
    }

    reserva.estado = "en_uso";
    await reserva.save();

    res.json({ mensaje: "Uso del laboratorio iniciado", reserva });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al iniciar uso", detalles: error.message });
  }
};

export const finalizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { comentarioDevolucion } = req.body;
    const reserva = await ReservaLaboratorio.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reserva.estado !== "en_uso") {
      return res.status(400).json({
        error: "Solo se puede finalizar una reserva en estado 'en_uso'",
      });
    }

    // Manejar imagen de devolución
    let imagenDevolucionPath = "";
    if (req.files && req.files.length > 0) {
      // Eliminar imagen anterior si existe
      if (reserva.imagenDevolucion) {
        const oldPath = path.join(process.cwd(), reserva.imagenDevolucion);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const tempPath = req.files[0].path;
      const ext = path.extname(tempPath);
      const finalName = `devolucion_${id}_${Date.now()}${ext}`;
      const finalPath = path.join(process.cwd(), "uploads/reservas", finalName);

      fs.mkdirSync(path.dirname(finalPath), { recursive: true });
      fs.renameSync(tempPath, finalPath);
      imagenDevolucionPath = `/uploads/reservas/${finalName}`;
    }

    reserva.estado = "finalizado";
    reserva.imagenDevolucion = imagenDevolucionPath;
    reserva.comentarioDevolucion = comentarioDevolucion || "";
    await reserva.save();

    res.json({
      mensaje: "Reserva finalizada exitosamente",
      reserva,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      fs.unlinkSync(req.files[0].path);
    }
    res
      .status(500)
      .json({ error: "Error al finalizar reserva", detalles: error.message });
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

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json({ mensaje: "Reserva marcada como notificada", reserva });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al marcar notificación", detalles: error.message });
  }
};

// ============================
// CONSULTAS ESPECIALES
// ============================

export const consultarDisponibilidad = async (req, res) => {
  try {
    const { laboratorio, fecha } = req.params;

    const reservas = await ReservaLaboratorio.find({
      laboratorio,
      fechaReserva: new Date(fecha),
      estado: { $ne: "cancelado" },
    }).sort({ horaInicio: 1 });

    const ocupados = reservas.map((r) => ({
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
      materia: r.materia,
      estado: r.estado,
    }));

    // Calcular horarios libres (jornada 7:00-22:00)
    const libres = [];
    let actual = "07:00";
    const finJornada = "22:00";

    reservas.forEach((reserva) => {
      if (actual < reserva.horaInicio) {
        libres.push({ horaInicio: actual, horaFin: reserva.horaInicio });
      }
      actual = reserva.horaFin;
    });

    if (actual < finJornada) {
      libres.push({ horaInicio: actual, horaFin: finJornada });
    }

    res.json({ fecha, laboratorio, ocupados, libres });
  } catch (error) {
    res.status(500).json({
      error: "Error al consultar disponibilidad",
      detalles: error.message,
    });
  }
};

// ============================
// REPORTES
// ============================

export const reporteOcupacion = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, laboratorio } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res
        .status(400)
        .json({ error: "fechaInicio y fechaFin son obligatorios" });
    }

    const filtros = {
      fechaReserva: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) },
      estado: { $ne: "cancelado" },
    };
    if (laboratorio) filtros.laboratorio = laboratorio;

    const reservas = await ReservaLaboratorio.find(filtros)
      .populate("asesorId", "controlNumber fullName")
      .sort({ fechaReserva: 1, horaInicio: 1 });

    // Estadísticas
    const totalReservas = reservas.length;
    const porLaboratorio = {};
    const porTurno = { AM: 0, PM: 0, NT: 0 };
    const porEstado = { reservado: 0, en_uso: 0, finalizado: 0 };
    const porAsesor = {};

    reservas.forEach((r) => {
      porLaboratorio[r.laboratorio] = (porLaboratorio[r.laboratorio] || 0) + 1;
      porTurno[r.turno]++;
      porEstado[r.estado]++;
      const nombre = r.asesorId?.fullName || "Sin asesor";
      porAsesor[nombre] = (porAsesor[nombre] || 0) + 1;
    });

    const dias = new Set(
      reservas.map((r) => r.fechaReserva.toISOString().split("T")[0])
    );
    const capacidadTotal = dias.size * 3; // 3 turnos por día
    const porcentajeOcupacion =
      capacidadTotal > 0
        ? ((totalReservas / capacidadTotal) * 100).toFixed(2)
        : "0";

    res.json({
      periodo: { fechaInicio, fechaFin },
      estadisticas: {
        totalReservas,
        porcentajeOcupacion: `${porcentajeOcupacion}%`,
        porLaboratorio,
        porTurno,
        porEstado,
        porAsesor,
        diasAnalizados: dias.size,
      },
      reservas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al generar reporte", detalles: error.message });
  }
};

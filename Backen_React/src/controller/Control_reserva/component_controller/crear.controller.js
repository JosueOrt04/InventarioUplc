import ReservaLaboratorio from "../../../models/reservaLaboratorio.model.js";
import User from "../../../models/user.model.js";
import fs from "fs";
import moment from "moment-timezone";

export const crearReserva = async (req, res) => {
  try {
    const {
      asesorId,
      laboratorio,
      fechaReserva,   // string: "YYYY-MM-DD"
      horaInicio,     // string: "HH:mm"
      horaFin,        // string: "HH:mm"
      materia,
      numeroAlumnos,
      equiposSolicitados,
      observacionRecepcion,
    } = req.body;

    /* ---------- 1. Validar asesor ---------- */
    const asesor = await User.findById(asesorId);
    if (!asesor) return res.status(404).json({ error: "Asesor no encontrado" });

    /* ---------- 2. Validar horarios ---------- */
    // Armamos fechas completas en zona México
    const hoyMx = moment.tz("America/Mexico_City").startOf("day");
    const fechaSolicitada = moment.tz(fechaReserva, "America/Mexico_City").startOf("day");

    // 2.a ¿Fecha pasada?
    if (fechaSolicitada.isBefore(hoyMx))
      return res.status(400).json({ error: "No se pueden hacer reservas en fechas anteriores al día de hoy" });

    // 2.b ¿Hora ya pasada si es el día de hoy?
    const ahoraMx = moment.tz("America/Mexico_City");
    const inicioSolicitado = moment.tz(`${fechaReserva} ${horaInicio}`, "YYYY-MM-DD HH:mm", "America/Mexico_City");

    if (fechaSolicitada.isSame(hoyMx, "day") && inicioSolicitado.isBefore(ahoraMx))
      return res.status(400).json({ error: "No se puede reservar una hora que ya pasó hoy" });

    // 2.c Duración válida
    const finSolicitado = moment.tz(`${fechaReserva} ${horaFin}`, "YYYY-MM-DD HH:mm", "America/Mexico_City");
    if (finSolicitado.isSameOrBefore(inicioSolicitado))
      return res.status(400).json({ error: "Hora fin debe ser mayor a hora inicio" });

    /* ---------- 3. Detectar conflictos ---------- */
    const conflicto = await ReservaLaboratorio.findOne({
      laboratorio,
      fechaReserva: fechaSolicitada.toDate(),
      estado: { $ne: "cancelado" },
      $or: [
        { horaInicio: { $lte: horaInicio }, horaFin: { $gt: horaInicio } },
        { horaInicio: { $lt: horaFin }, horaFin: { $gte: horaFin } },
        { horaInicio: { $gte: horaInicio }, horaFin: { $lte: horaFin } },
      ],
    });
    if (conflicto)
      return res.status(409).json({ error: "Horario no disponible", conflicto });

    /* ---------- 4. Info automática (hora, día, turno) ---------- */
    const diaSemana = inicioSolicitado.format("dddd"); // lunes, martes…
    const horaNum = inicioSolicitado.hour();          // 0-23

    let turno;
    if (horaNum >= 7 && horaNum < 13) turno = "AM";
    else if (horaNum >= 13 && horaNum < 19) turno = "PM";
    else turno = "NT";

    /* ---------- 5. Guardar imagen si la hay ---------- */
    let imagenRecepcionPath = "";
    if (req.file) imagenRecepcionPath = `Imagen_Reservas/reservas_prestamos/${req.file.filename}`;

    /* ---------- 6. Crear reserva ---------- */
    const nuevaReserva = new ReservaLaboratorio({
      asesorId,
      controlNumberAsesor: asesor.controlNumber,
      nombreAsesor: asesor.fullName,
      imagenAsesor: asesor.profilePic || "",
      laboratorio,
      fechaReserva: fechaSolicitada.toDate(),
      horaInicio,
      horaFin,
      turno,                         // <- calculado
      diaSemana,                     // <- nuevo campo (opcional)
      horaRegistro: ahoraMx.toDate(),// <- momento exacto de la petición
      materia,
      numeroAlumnos,
      equiposSolicitados: Array.isArray(equiposSolicitados)
        ? equiposSolicitados
        : [equiposSolicitados].filter(Boolean),
      observacionRecepcion,
      imagenRecepcion: imagenRecepcionPath,
    });

    await nuevaReserva.save();
    await nuevaReserva.populate("asesorId", "controlNumber fullName role profilePic");

    res.status(201).json({ mensaje: "Reserva creada", reserva: nuevaReserva });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: error.message });
  }
};
// routes/reservas.route.js
/* ------------------------------------------------------------------
 *  ARCHIVO:  Define el ciclo de vida completo de una reserva de laboratorio.
 *  OBJETIVO: CRUD + flujo de estados (crear→cancelar→iniciar→finalizar) +
 *            consultas de disponibilidad y reportes de ocupación.
 * ------------------------------------------------------------------ */

import express from "express";
import {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,
  consultarDisponibilidad,
  cancelarReserva,
  iniciarUso,
  finalizarReserva,
  marcarNotificado,
  reporteOcupacion,
  getHorariosOcupados,
} from "../../controller/Control_reserva/index.js";

import {
  uploadRecepcion,
  uploadDevolucion,
} from "../Con_gur_Im/uplosd_reservas_la.route.js";

import { protectRoute } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermissions.js";

const router = express.Router();

/* ================================================================
 *  CRUD BÁSICO
 * ================================================================ */

// 1. Crear reserva (POST /api/reservas)
// Permiso: registro
// Body: JSON de reserva + imagenRecepcion (opcional)
router.post(
  "/",
  protectRoute,
  checkPermission("registro"),
  uploadRecepcion.single("imagenRecepcion"),
  crearReserva
);

// 2. Listar reservas con filtros por query (GET /api/reservas)
// Permiso: registro
// Query: ?laboratorio=Lab-A&fecha=2024-12-04&estado=pendiente…
router.get(
  "/",
  protectRoute,
  checkPermission("registro"),
  obtenerReservas
);

// 3. Obtener una reserva por ID (GET /api/reservas/:id)
// Permiso: registro
router.get(
  "/:id",
  protectRoute,
  checkPermission("registro"),
  obtenerReservaPorId
);

// 4. Actualizar reserva (PUT /api/reservas/:id)
// Permiso: registro
// Body: JSON de cambios + imagenRecepcion (opcional)
router.put(
  "/:id",
  protectRoute,
    checkPermission("modificacion"),
  uploadRecepcion.single("imagenRecepcion"),
  actualizarReserva
);


// 5. Eliminar reserva (DELETE /api/reservas/:id)
// Permiso: registro
router.delete(
  "/:id",
  protectRoute,
  checkPermission("eliminacion"),
  eliminarReserva
);

/* ================================================================
 *  GESTIÓN DE ESTADO (flujo completo)
 * ================================================================ */

// 6. Cancelar reserva (PATCH /api/reservas/:id/cancelar)
// Body: { razonCancelacion }
router.patch(
  "/:id/cancelar",
  protectRoute,
  checkPermission("modificacion"),
  cancelarReserva
);

// 7. Pasar reserva a “en_uso” (PATCH /api/reservas/:id/iniciar-uso)
router.patch(
  "/:id/iniciar-uso",
  protectRoute,
  checkPermission("modificacion"),
  iniciarUso
);

// 8. Finalizar reserva y subir evidencia (PATCH /api/reservas/:id/finalizar)
// Form-data: imagenDevolucion (opcional)
router.patch(
  "/:id/finalizar",
  protectRoute,
  checkPermission("modificacion"),
  uploadDevolucion.single("imagenDevolucion"),
  finalizarReserva
);

// 9. Marcar reserva como notificada (PATCH /api/reservas/:id/notificar)
router.patch(
  "/:id/notificar",
  protectRoute,
  checkPermission("modificacion"),
  marcarNotificado
);

/* ================================================================
 *  CONSULTAS ESPECIALES
 * ================================================================ */

// 10. Consultar disponibilidad de un laboratorio en fecha dada
// GET /api/reservas/disponibilidad/:laboratorio/:fecha
// Respuesta: { ocupados:[{horaInicio,horaFin}], libres:[{horaInicio,horaFin}] }
router.get(
  "/disponibilidad/:laboratorio/:fecha",
  protectRoute,
  checkPermission("lectura"),
  consultarDisponibilidad
);

// 11. Obtener horarios ocupados (genérico)
// GET /api/reservas/horarios-ocupados
// Query: ?laboratorio=Lab-A&fecha=2024-12-04
router.get("/horarios-ocupados", protectRoute,   checkPermission("lectura"),getHorariosOcupados);

/* ================================================================
 *  REPORTES
 * ================================================================ */

// 12. Reporte de ocupación por rango de fechas y laboratorio
// GET /api/reservas/reporte/ocupacion
// Query: ?fechaInicio=2024-11-01&fechaFin=2024-11-30&laboratorio=Lab-A
router.get(
  "/reporte/ocupacion",
  protectRoute,
  checkPermission("registro"),
  reporteOcupacion
);

export default router;
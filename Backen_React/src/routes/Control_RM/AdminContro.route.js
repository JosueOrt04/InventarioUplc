// routes/AdminContro.route.js
/* ------------------------------------------------------------------
 *  ARCHIVO:  Define todas las rutas administrativas del sistema.
 *  OBJETIVO: Centralizar endpoints de gestión de usuarios, reactivos,
 *            herramientas y préstamos con sus respectivos permisos.
 * ------------------------------------------------------------------ */

import express from "express";
import {
  crearPrestamo,
  devolverPrestamo,
  listarPrestamos,
  obtenerEstadisticas,
  buscarPrestamos,
  listarUsuarios,
  listarReactivos,
  listarHerramientas,
} from "../../controller/Control_U_MR/Mcontrol.controller.js";

import {
  Actualizar_Herramienta,
  Buscar_Herramientas,
} from "../../controller/Registro_Material/Actualizar_Herramienta.controller.js";

import { protectRoute } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermissions.js";
import Herramienta from "../../models/Herramienta.model.js";

const router = express.Router();

/* ================================================================
 *  PRÉSTAMOS
 * ================================================================ */

// 1. Crear un nuevo préstamo (POST /api/admin/prestamos)
// Permiso: registro
router.post(
  "/prestamos",
  protectRoute,
  checkPermission("registro"),
  crearPrestamo
);

// 2. Marcar un préstamo como devuelto (PUT /api/admin/prestamos/devolver/:prestamoId)
// Permiso: modificacion
router.put(
  "/prestamos/devolver/:prestamoId",
  protectRoute,
  checkPermission("modificacion"),
  devolverPrestamo
);

// 3. Listar todos los préstamos (GET /api/admin/prestamos)
// Permiso: lectura
router.get(
  "/prestamos",
  protectRoute,
  checkPermission("lectura"),
  listarPrestamos
);

// 4. Obtener estadísticas globales de préstamos (GET /api/admin/prestamos/estadisticas)
// Permiso: lectura
router.get(
  "/prestamos/estadisticas",
  protectRoute,
  checkPermission("lectura"),
  obtenerEstadisticas
);

// 5. Buscar préstamos con filtros (GET /api/admin/prestamos/buscar)
// Permiso: lectura
router.get(
  "/prestamos/buscar",
  protectRoute,
  checkPermission("lectura"),
  buscarPrestamos
);

/* ================================================================
 *  USUARIOS
 * ================================================================ */

// 6. Listar todos los usuarios del sistema (GET /api/admin/users)
// Permiso: lectura
router.get(
  "/users",
  protectRoute,
  checkPermission("lectura"),
  listarUsuarios
);

/* ================================================================
 *  REACTIVOS
 * ================================================================ */

// 7. Listar todos los reactivos (GET /api/admin/reactivos)
// Permiso: lectura
router.get(
  "/reactivos",
  protectRoute,
  checkPermission("lectura"),
  listarReactivos
);

/* ================================================================
 *  HERRAMIENTAS
 * ================================================================ */

// 8. Listar todas las herramientas (GET /api/admin/herramientas)
// Permiso: lectura
router.get(
  "/herramientas",
  protectRoute,
  checkPermission("lectura"),
  listarHerramientas
);

// 9. Actualizar una herramienta por ID (PUT /api/admin/herramientas/:id)
// Permiso: registro
router.put(
  "/herramientas/:id",
  protectRoute,
  checkPermission("registro"),
  Actualizar_Herramienta
);

// 10. Buscar herramientas con filtros (GET /api/admin/herramientas/buscar)
// Permiso: modificacion
router.get(
  "/herramientas/buscar",
  protectRoute,
  checkPermission("modificacion"),
  Buscar_Herramientas
);

// 11. Obtener una herramienta específica por ID (GET /api/admin/herramientas/:id)
// Permiso: modificacion
router.get(
  "/herramientas/:id",
  protectRoute,
  checkPermission("modificacion"),
  async (req, res) => {
    try {
      const herramienta = await Herramienta.findById(req.params.id);
      if (!herramienta) {
        return res.status(404).json({
          success: false,
          message: "Herramienta no encontrada",
        });
      }
      res.json({ success: true, data: herramienta });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener la herramienta",
      });
    }
  }
);

export default router;
import express from "express";

import {
  Registro_Reactivo,
  buscarReactivos,
  obtenerReactivoPorCodigo,
  actualizarReactivo,
  eliminarReactivo,
} from "../../controller/Registro_Reactivos/Registro.controller.js";

import {
  Registro_Herramienta,
  obtenerHerramientaPorId,
  buscarHerramientas,
  eliminarHerramienta,
} from "../../controller/Registro_Material/Registro_MaterialL.controller.js";

import { Actualizar_Herramienta } from "../../controller/Registro_Material/Actualizar_Herramienta.controller.js";
import { checkPermission } from "../../middleware/checkPermissions.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Rutas para Reactivos
router.post(
  "/reactivos",
  protectRoute,
  checkPermission("registro"),
  Registro_Reactivo
);
router.get(
  "/reactivos/search",
  protectRoute,
  checkPermission("lectura"),
  buscarReactivos
);
router.get("/reactivos/:codigo", protectRoute, obtenerReactivoPorCodigo);
router.put(
  "/reactivos/:codigo",
  protectRoute,
  checkPermission("modificacion"),
  actualizarReactivo
);
router.delete(
  "/reactivos/:codigo",
  protectRoute,
  checkPermission("eliminacion"),
  eliminarReactivo
);

// ✅ RUTAS CORREGIDAS PARA HERRAMIENTAS
router.post(
  "/herramientas",
  protectRoute,
  checkPermission("registro"),
  Registro_Herramienta
);

router.get(
  "/herramientas/buscar",
  protectRoute,
  checkPermission("lectura"),
  buscarHerramientas
);

router.get(
  "/herramientas/:id",
  protectRoute,
  checkPermission("lectura"),
  obtenerHerramientaPorId
);

router.put(
  "/herramientas/:id", // ✅ CORREGIDO: usa :id en lugar de :codigo
  protectRoute,
  checkPermission("modificacion"),
  Actualizar_Herramienta // ✅ CORREGIDO: usa el controlador correcto
);

router.delete(
  "/herramientas/:id",
  protectRoute,
  checkPermission("eliminacion"),
  eliminarHerramienta // ✅ Asegúrate de que este controlador esté importado
);

export default router;

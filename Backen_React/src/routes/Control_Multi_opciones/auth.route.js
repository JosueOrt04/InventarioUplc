import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  PermisosAutorisacion,
  updateName,
  updatePassword,
} from "../../controller/Registro_usuarios/auth.controller.js";

import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:controlNumber/permissions", PermisosAutorisacion);

router.get("/check", protectRoute, checkAuth);

// Rutas protegidas para editar perfil
router.put("/profile/name", protectRoute, updateName);
router.put("/profile/password", protectRoute, updatePassword);

export default router;

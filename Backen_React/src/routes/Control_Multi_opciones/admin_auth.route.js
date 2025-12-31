import express from "express";

import {
  getAllUsers,
  updateUser,
  deleteUser,
  blockUser
} from "../../controller/Registro_usuarios/admin/admin.controller.js";


const router = express.Router();

router.get("/users", getAllUsers);

router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.patch("/users_Block/:id/block", blockUser);


export default router;

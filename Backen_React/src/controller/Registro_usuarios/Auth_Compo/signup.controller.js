import { generateToken } from "../../../lib/utils.js";
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";
import { handleUserCreation } from "./userService.js";

export const signup = async (req, res) => {
  const { fullName, controlNumber, password, role, PermisosEx } = req.body;

  try {
    // Validar usuario existente
    const existingUser = await User.findOne({ controlNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Crear usuario
    const newUser = await handleUserCreation({
      fullName,
      controlNumber,
      password,
      role,
      PermisosEx
    });

    // Generar token
    generateToken(newUser._id, res);

    // Responder con datos del usuario
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      controlNumber: newUser.controlNumber,
      role: newUser.role,
      PermisosEx: newUser.PermisosEx,
      profilePic: newUser.profilePic,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
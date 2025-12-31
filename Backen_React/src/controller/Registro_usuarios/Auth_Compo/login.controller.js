import { generateToken } from "../../../lib/utils.js";
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";
import { validateCredentials, checkUserBlocked } from "./authValidators.js";

export const login = async (req, res) => {
  const { controlNumber, password } = req.body;
  
  try {
    // 1. Buscar usuario
    const user = await User.findOne({ controlNumber });

    // 2. Validar credenciales
    const credentialsValid = await validateCredentials(user, password);
    if (!credentialsValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Verificar si está bloqueado
    const isBlocked = checkUserBlocked(user);
    if (isBlocked) {
      return res.status(403).json({
        message: "Tu cuenta ha sido bloqueada. Contacta al administrador para desbloquearla.",
      });
    }

    // 4. Generar token y responder
  generateToken(user._id, res);          // ← ya crea la cookie

res.status(200).json({
  _id: user._id,
  fullName: user.fullName,
  controlNumber: user.controlNumber,
  profilePic: user.profilePic,
  role: user.role,
  PermisosEx: user.PermisosEx,
  createdAt: user.createdAt,
  token: req.cookies.jwt,             // ⭐ agregá esta línea
});
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
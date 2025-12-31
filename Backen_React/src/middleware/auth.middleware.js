import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Leer token de cookie O de header Authorization
let token = req.cookies?.jwt;

// Si no hay cookie, probar el header Authorization
if (!token && req.headers.authorization?.startsWith('Bearer ')) {
  token = req.headers.authorization.split(' ')[1];
}

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado - Sin token" });
    }

    // 2. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  3. Buscar usuario
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

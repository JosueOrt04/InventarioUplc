// permissionsMiddleware.js

export const checkPermission = (permission) => {
  return (req, res, next) => {
    // protectRoute ya debe haber puesto al usuario en req.user
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    // 1. El admin siempre tiene permiso
    if (req.user.role === "admin") {
      return next();
    }

    // 2. Verifica el permiso específico
    if (req.user.PermisosEx && req.user.PermisosEx[permission] === true) {
      return next();
    }

    // 3. Si no es admin y no tiene el permiso, denegar acceso
    return res
      .status(403)
      .json({ message: "Acceso denegado. No tienes los permisos necesarios." });
  };
};

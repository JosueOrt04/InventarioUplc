export const checkAuth = (req, res) => {
  const userResponse = buildUserResponse(req.user);
  userResponse.token = req.cookies.jwt; // ⭐ mismo acá
  res.status(200).json(userResponse);
};

export const PermisosAutorisacion = (req, res) => {
  const userResponse = buildUserResponse(req.user);
  res.status(200).json(userResponse);
};

export const debugAuth = (req, res) => {
  console.log("Cookies en debug:", req.cookies);
  res.status(200).json({
    cookies: req.cookies,
    message: "Debug endpoint",
  });
};

// Función auxiliar para construir respuesta del usuario
const buildUserResponse = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  controlNumber: user.controlNumber,
  profilePic: user.profilePic,
  role: user.role,
  PermisosEx: user.PermisosEx,
  createdAt: user.createdAt,
});
export const userResponse = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  controlNumber: user.controlNumber,
  profilePic: user.profilePic,
  role: user.role,
  PermisosEx: user.PermisosEx,
  createdAt: user.createdAt,
});

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const successResponse = (res, statusCode, data = {}, message = "") => {
  return res.status(statusCode).json({ ...data, message });
};
import bcrypt from "bcryptjs";

export const validateCredentials = async (user, password) => {
  if (!user) return false;
  return await bcrypt.compare(password, user.password);
};

export const checkUserBlocked = (user) => {
  return user.blocked === true;
};

export const validateSignupData = (data) => {
  const { fullName, controlNumber, password } = data;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push("El nombre completo es requerido (mínimo 2 caracteres)");
  }

  if (!controlNumber || controlNumber.trim().length < 3) {
    errors.push("El número de control es requerido");
  }

  if (!password || password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
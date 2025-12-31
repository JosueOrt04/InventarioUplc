import toast from "react-hot-toast";

export const validateSignupForm = (formData) => {
  const { fullName, controlNumber, password } = formData;

  if (!fullName.trim()) {
    toast.error("Full name is required");
    return false;
  }

  if (!controlNumber.trim()) {
    toast.error("Control number is required");
    return false;
  }

  // Validaciones específicas para el número de control
  const controlNumberStr = controlNumber.toString();

  // Solo dígitos
  if (!/^\d+$/.test(controlNumberStr)) {
    toast.error("Control number must contain only digits");
    return false;
  }

  // Longitud entre 10 y 12 caracteres
  if (controlNumberStr.length < 10 || controlNumberStr.length > 12) {
    toast.error("Control number must be between 10 and 12 digits");
    return false;
  }

  // Prefijo requerido
  const requiredPrefix = "511622030";
  if (!controlNumberStr.startsWith(requiredPrefix)) {
    toast.error(`Control number must start with ${requiredPrefix}`);
    return false;
  }

  if (!password) {
    toast.error("Password is required");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};

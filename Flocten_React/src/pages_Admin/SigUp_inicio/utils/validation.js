import { CONTROL_NUMBER, PASSWORD_MIN_LENGTH } from '../auth';
import toast from 'react-hot-toast';

// Reutiliza validaciones del formulario normal o crea específicas
export const validateAdminSignUpForm = (formData) => {
  if (!formData.fullName.trim()) {
    toast.error('El nombre completo es obligatorio');
    return false;
  }

  const controlNumberValidation = validateControlNumber(formData.controlNumber);
  if (!controlNumberValidation.isValid) {
    toast.error(controlNumberValidation.message);
    return false;
  }

  if (!formData.password) {
    toast.error('La contraseña es obligatoria');
    return false;
  }

  if (formData.password.length < PASSWORD_MIN_LENGTH) {
    toast.error(`La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`);
    return false;
  }

  // Validación adicional específica para admin si fuera necesario
  // Por ejemplo: verificar que el número de control tenga acceso de admin

  return true;
};

export const validateControlNumber = (controlNumber) => {
  const value = controlNumber.trim();

  if (!value) return { isValid: false, message: 'El número de control es obligatorio' };

  if (!/^\d+$/.test(value)) {
    return { isValid: false, message: 'El número de control solo debe contener dígitos' };
  }

  if (value.length < CONTROL_NUMBER.MIN_LENGTH || value.length > CONTROL_NUMBER.MAX_LENGTH) {
    return { isValid: false, message: `El número de control debe tener entre ${CONTROL_NUMBER.MIN_LENGTH} y ${CONTROL_NUMBER.MAX_LENGTH} dígitos` };
  }

if (!value.startsWith(CONTROL_NUMBER.REQUIRED_PREFIX)) {
  return { isValid: false, message: 'El número de control no es válido' };
}

  return { isValid: true };
};
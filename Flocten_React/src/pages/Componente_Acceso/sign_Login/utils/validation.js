import { CONTROL_NUMBER, PASSWORD_MIN_LENGTH } from '../constants/auth';
import toast from 'react-hot-toast';

export const validateControlNumber = (controlNumber) => {
  const value = controlNumber.trim();
  
  if (!value) return { isValid: false, message: 'Control number is required' };
  
  if (!/^\d+$/.test(value)) {
    return { isValid: false, message: 'Control number must contain only digits' };
  }
  
  if (value.length < CONTROL_NUMBER.MIN_LENGTH || value.length > CONTROL_NUMBER.MAX_LENGTH) {
    return { isValid: false, message: `Control number must be between ${CONTROL_NUMBER.MIN_LENGTH} and ${CONTROL_NUMBER.MAX_LENGTH} digits` };
  }
  
  if (!value.startsWith(CONTROL_NUMBER.REQUIRED_PREFIX)) {
    return { isValid: false, message: `Control number must start with ${CONTROL_NUMBER.REQUIRED_PREFIX}` };
  }
  
  return { isValid: true };
};

export const validateSignUpForm = (formData) => {
  if (!formData.fullName.trim()) {
    toast.error('Full name is required');
    return false;
  }
  
  const controlNumberValidation = validateControlNumber(formData.controlNumber);
  if (!controlNumberValidation.isValid) {
    toast.error(controlNumberValidation.message);
    return false;
  }
  
  if (!formData.password) {
    toast.error('Password is required');
    return false;
  }
  
  if (formData.password.length < PASSWORD_MIN_LENGTH) {
    toast.error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
    return false;
  }
  
  return true;
};
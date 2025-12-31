import { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { validateAdminSignUpForm } from '../utils/validation';

export const useSignUpAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    controlNumber: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAdminSignUpForm(formData)) {
      // Podrías agregar role: 'admin' al payload si tu backend lo requiere
      signup({ ...formData, role: 'admin' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return {
    formData,
    showPassword,
    isSigningUp,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
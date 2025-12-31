import { useState } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { validateSignUpForm } from '../utils/validation';

export const useSignUpForm = () => {
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
    if (validateSignUpForm(formData)) {
      signup(formData);
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
import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore.js";
import { validateSignupForm } from "./validation.js";

export const useSignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    controlNumber: "",
    password: "",
    role: "admin", // Valor por defecto
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSignupForm(formData)) {
      signup(formData);
    }
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    isSigningUp,
  };
};

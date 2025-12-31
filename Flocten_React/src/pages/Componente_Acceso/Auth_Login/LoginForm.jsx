// src/components/auth/LoginForm.jsx
import { useState } from "react";
import { Loader2, User, AlertCircle } from "lucide-react";
import PasswordInput from "./PasswordInput";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ onLogin, isLoggingIn, error }) => {
  const [formData, setFormData] = useState({
    controlNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo Número de Control */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-base-content/80">
            Número de Control
          </span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <User className="h-5 w-5 text-base-content/40 transition-colors group-focus-within:text-primary" />
          </div>
          <input
            type="text"
            name="controlNumber"
            className="input input-bordered w-full pl-10 pr-3 py-3 text-sm sm:text-base focus:input-primary transition-all duration-200"
            placeholder="Ej. 21100001"
            value={formData.controlNumber}
            onChange={handleChange}
            required
            autoComplete="username"
            pattern="[0-9]{8,}"
            title="Ingresa un número de control válido"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Ingresa tu contraseña"
      />

      {/* Mensaje de Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="alert alert-error shadow-sm text-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de Submit */}
      <motion.button
        type="submit"
        className="btn btn-primary w-full py-3 text-base font-medium relative overflow-hidden"
        disabled={isLoggingIn}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isLoggingIn ? (
            <motion.span
              key="loading"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Iniciando sesión...</span>
            </motion.span>
          ) : (
            <motion.span
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesión</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default LoginForm;

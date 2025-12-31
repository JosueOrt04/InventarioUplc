// src/pages/SigUp_inicio/components/SignUpAdminForm.jsx

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageSquare, Loader2, AlertCircle, Lock } from "lucide-react";
import { AuthHeader } from "./AuthHeader";
import { FormInput } from "./FormInput"; // Usaremos la versión mejorada abajo
import { useSignUpAdminForm } from "../hooks/useSignUpAdminForm";
import { CONTROL_NUMBER } from "../auth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const SignUpAdminForm = () => {
  const {
    formData,
    showPassword,
    isSigningUp,
    error, // Asegúrate de que tu hook devuelva error si existe
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useSignUpAdminForm();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* HEADER ESPECÍFICO PARA ADMIN */}
      <AuthHeader 
        title="Crear Admin" 
        subtitle="Registra un nuevo administrador en el sistema"
      />

      {/* CARD DEL FORMULARIO */}
      <motion.div
        variants={itemVariants}
        className="card bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        whileHover={{ y: -2 }}
      >
        <div className="card-body p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Mensaje de Error (si existe en tu lógica) */}
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

            <FormInput
              label="Nombre Completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              icon={User}
              placeholder="Ej. Juan Pérez García"
              helperText="Nombre completo del administrador"
            />

            <FormInput
              label="Número de Control"
              name="controlNumber"
              value={formData.controlNumber}
              onChange={handleChange}
              icon={MessageSquare}
      
              maxLength={CONTROL_NUMBER.MAX_LENGTH}
           
            />

            <FormInput
              label="Contraseña"
              name="password"
              type="password" // El componente FormInput manejará el toggle internamente si se configura
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              placeholder="••••••••"
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              helperText="Mín. 8 caracteres, mayúsculas y números"
            />

            {/* Checkbox Términos */}
            <motion.div
              className="form-control"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <label className="label cursor-pointer justify-start gap-3 py-3 rounded-lg hover:bg-base-200/50 transition-colors duration-200">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  required
                />
                <span className="label-text text-sm text-base-content">
                  Acepto los{" "}
                  <Link to="/Politecas_de_usos" className="link link-primary font-semibold">
                    Términos
                  </Link>{" "}
                  y{" "}
                  <Link to="/Politecas_de_usos" className="link link-primary font-semibold">
                    Privacidad
                  </Link>
                </span>
              </label>
            </motion.div>

            {/* Botón Submit */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full py-3 text-base font-medium relative overflow-hidden"
              disabled={isSigningUp}
              whileHover={{ scale: isSigningUp ? 1 : 1.01 }}
              whileTap={{ scale: isSigningUp ? 1 : 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isSigningUp ? (
                  <motion.span
                    key="loading"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creando...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Crear Cuenta Admin
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Footer del Form */}
          <div className="divider text-xs text-base-content/50 my-6">
            Acceso Administrativo
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-base-content/70">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="link link-primary font-semibold hover:link-secondary transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
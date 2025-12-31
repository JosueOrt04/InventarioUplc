import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { SignUpInput } from "./SignUpInput";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import { CONTROL_NUMBER } from "../../constants/auth";
import SignHeader from "./SignHeader"
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const SignUpForm = () => {
  const {
    formData,
    showPassword,
    isSigningUp,
    error,
    success,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useSignUpForm();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* HEADER */}
  
<SignHeader/>
      {/* FORM CARD */}
      <motion.div
        variants={itemVariants}
        className="card bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        whileHover={{ y: -2 }}
      >
        <div className="card-body p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mensajes de estado */}
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
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="alert alert-success shadow-sm text-sm"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Campos del formulario */}
            <SignUpInput
              label="Nombre Completo"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ej. María García López"
              icon={User}
              autoComplete="name"
              pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,50}"
              helperText="Ingresa tu nombre completo (3-50 caracteres)"
              disabled={isSigningUp}
            />

            <SignUpInput
              label="Número de Control"
              name="controlNumber"
              type="text"
              value={formData.controlNumber}
              onChange={handleChange}
              placeholder={`Ej. ${CONTROL_NUMBER.REQUIRED_PREFIX}XX`}
              icon={User}
              maxLength={CONTROL_NUMBER.MAX_LENGTH}
              pattern={`${CONTROL_NUMBER.REQUIRED_PREFIX}[0-9]{${
                CONTROL_NUMBER.MIN_LENGTH -
                CONTROL_NUMBER.REQUIRED_PREFIX.length
              },${
                CONTROL_NUMBER.MAX_LENGTH -
                CONTROL_NUMBER.REQUIRED_PREFIX.length
              }}`}
              helperText={`Debe comenzar con "${CONTROL_NUMBER.REQUIRED_PREFIX}" y tener ${CONTROL_NUMBER.MIN_LENGTH}-${CONTROL_NUMBER.MAX_LENGTH} dígitos`}
              disabled={isSigningUp}
            />

            <SignUpInput
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una contraseña segura"
              icon={Lock}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              helperText="Mínimo 8 caracteres: mayúsculas, minúsculas y números"
              minLength={8}
              autoComplete="new-password"
              disabled={isSigningUp}
            />

            {/* Checkbox de términos */}
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
                  disabled={isSigningUp}
                />

                <span className="label-text text-sm text-base-content break-words whitespace-normal">
                  Acepto los{" "}
                  <Link
                    to="/Politecas_de_usos_A"
                    className="link link-primary font-semibold hover:link-secondary"
                  >
                    Términos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link
                    to="/Politecas_de_usos_A"
                    className="link link-primary font-semibold hover:link-secondary"
                  >
                    Política de Privacidad
                  </Link>
                </span>
              </label>
            </motion.div>

            {/* Botón de registro */}
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
                    <span>Creando cuenta...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Crear Cuenta
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Separador */}
          <div className="divider text-xs text-base-content/50 my-6">
            ¿Ya tienes cuenta?
          </div>

          {/* ✅ REDIRECCIÓN DIRECTA - SIN COMPONENTE EXTERNO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
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
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpForm;

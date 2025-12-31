// src/components/auth/PasswordInput.jsx
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "••••••••",
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium text-base-content/80">
          Contraseña
        </span>
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <Lock className="h-5 w-5 text-base-content/40 transition-colors group-focus-within:text-primary" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="input input-bordered w-full pl-10 pr-12 py-3 text-sm sm:text-base focus:input-primary transition-all duration-200"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          autoComplete="current-password"
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          whileTap={{ scale: 0.9 }}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showPassword ? "eye-off" : "eye"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-base-content/40 hover:text-base-content/70 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-base-content/40 hover:text-base-content/70 transition-colors" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordInput;

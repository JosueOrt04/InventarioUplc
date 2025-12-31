// src/pages/SigUp_inicio/components/FormInput.jsx

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  maxLength,
  helperText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determinar tipo de input (texto o password)
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  const hasError = !!error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="form-control w-full"
    >
      <label className="label pb-2">
        <span className="label-text font-semibold text-base-content/80">
          {label}
        </span>
        {hasError && (
          <span className="label-text-alt text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">{error}</span>
          </span>
        )}
      </label>

      <div className="relative group">
        {/* Icono Izquierdo */}
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors duration-200 ${
            isFocused ? "text-primary" : "text-base-content/40"
          }`}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>

        {/* Input */}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            input input-bordered w-full 
            pl-10 ${showPasswordToggle ? "pr-12" : "pr-4"} py-3
            text-sm sm:text-base transition-all duration-200
            ${hasError ? "input-error" : ""}
            ${!hasError && isFocused ? "input-primary border-2" : ""}
            focus:outline-none focus:ring-0
          `}
          placeholder={placeholder}
          maxLength={maxLength}
        />

        {/* Toggle Password (Icono Derecho) */}
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 hover:text-primary transition-colors cursor-pointer"
            onClick={onTogglePassword}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={showPassword ? "hide" : "show"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/50" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/50" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-2 text-xs pl-1 ${
            hasError ? "text-error" : "text-base-content/60"
          }`}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
};

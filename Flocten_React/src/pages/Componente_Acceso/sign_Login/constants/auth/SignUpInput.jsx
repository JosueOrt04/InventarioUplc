// src/components/auth/SignUpInput.jsx

import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SignUpInput = ({
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
  success,
  disabled,
  autoComplete,
  pattern,
  minLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  const hasError = !!error;
  const hasSuccess = !!success && !hasError && value.length > 0;
  const isDisabled = disabled || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="form-control w-full"
    >
      <label className="label pb-2">
        <span className="label-text font-semibold text-base-content/80">
          {label}
        </span>
        <AnimatePresence mode="wait">
          {hasError && (
            <motion.span
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="label-text-alt text-error flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">{error}</span>
            </motion.span>
          )}
          {hasSuccess && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="label-text-alt text-success flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs">Válido</span>
            </motion.span>
          )}
        </AnimatePresence>
      </label>

      <div className="relative group">
        {/* Icono izquierdo */}
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors duration-200 ${
            !isDisabled && "group-focus-within:text-primary"
          }`}
        >
          <Icon
            className={`
              h-5 w-5 transition-colors duration-200
              ${
                hasError
                  ? "text-error"
                  : hasSuccess
                  ? "text-success"
                  : "text-base-content/40"
              }
              ${
                !isDisabled &&
                !hasError &&
                !hasSuccess &&
                isFocused &&
                "text-primary"
              }
            `}
          />
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
            ${showPasswordToggle ? "pr-12" : "pr-4"} pl-10 py-3
            text-sm sm:text-base transition-all duration-200
            ${hasError ? "input-error border-2" : ""}
            ${hasSuccess ? "input-success border-2" : ""}
            ${
              !hasError && !hasSuccess && isFocused
                ? "input-primary border-2"
                : ""
            }
            ${isDisabled ? "input-disabled cursor-not-allowed" : ""}
            focus:outline-none focus:ring-0
          `}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          disabled={isDisabled}
          autoComplete={autoComplete}
          pattern={pattern}
          aria-invalid={hasError}
          aria-describedby={`${name}-help`}
          required
        />

        {/* Toggle Contraseña */}
        {showPasswordToggle && (
          <motion.button
            type="button"
            className={`absolute inset-y-0 right-0 pr-3 flex items-center z-10 transition-colors duration-200 ${
              isDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:text-primary"
            }`}
            onClick={onTogglePassword}
            disabled={isDisabled}
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
                  <EyeOff className="h-5 w-5 text-base-content/50 hover:text-base-content/70" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/50 hover:text-base-content/70" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <motion.p
          id={`${name}-help`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            mt-2 text-xs pl-1 transition-colors duration-200
            ${hasError ? "text-error" : "text-base-content/60"}
          `}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SignUpInput;

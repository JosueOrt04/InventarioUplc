import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Variantes de animación
const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const labelVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.1 },
  },
};

const textareaVariants = {
  initial: { scale: 0.98, opacity: 0.8 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  focus: {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const charCounterVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.3 } },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3, type: "spring" },
  },
};

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder,
  required,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const charCount = value?.length || 0;
  const isNearLimit = maxLength && charCount > maxLength * 0.8;
  const isOverLimit = maxLength && charCount > maxLength;

  return (
    <motion.div
      className="form-control w-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.label
        className="label flex items-center gap-2"
        variants={labelVariants}
      >
        <span className="label-text font-semibold flex items-center gap-2">
          <svg
            className="h-4 w-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          {label}
        </span>
        {required && (
          <span className="badge badge-primary badge-sm">Requerido</span>
        )}
        {maxLength && (
          <motion.span
            className={`
              ml-auto text-xs font-bold
              ${
                isOverLimit
                  ? "text-error"
                  : isNearLimit
                  ? "text-warning"
                  : "text-base-content/60"
              }
            `}
            variants={charCounterVariants}
            animate={isNearLimit && !isFocused ? "pulse" : ""}
          >
            {charCount} / {maxLength}
          </motion.span>
        )}
      </motion.label>

      <motion.textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        variants={textareaVariants}
        whileFocus="focus"
        className={`
          textarea textarea-bordered w-full resize-vertical
          ${
            isOverLimit
              ? "textarea-error"
              : isNearLimit
              ? "textarea-warning"
              : "textarea-primary"
          }
          focus:textarea-secondary transition-all duration-300
          ${isFocused ? "shadow-lg" : ""}
        `}
        required={required}
      />

      <AnimatePresence>
        {placeholder && !isFocused && (
          <motion.label
            className="label"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <span className="label-text-alt text-base-content/60">
              {placeholder}
            </span>
          </motion.label>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TextAreaField;

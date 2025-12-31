import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Variantes de animación
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const alertVariants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

const ReactiveBasicInfo = ({ reactiveData, onInputChange }) => {
  const [quantityError, setQuantityError] = useState("");

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // Validar que sea número entero positivo
    if (value === "" || value === "0") {
      setQuantityError("");
      onInputChange(e);
      return;
    }

    // Regex para solo números enteros positivos
    const integerRegex = /^[1-9]\d*$/;

    if (!integerRegex.test(value)) {
      setQuantityError(
        "Solo se permiten números enteros positivos (ej: 1, 10, 156)"
      );
      // No actualizar el estado si no es válido
      return;
    }

    setQuantityError("");
    onInputChange(e);
  };

  const handleQuantityBlur = (e) => {
    const value = e.target.value;
    if (value && !/^[1-9]\d*$/.test(value)) {
      // Limpiar el campo si no es válido al salir
      e.target.value = "";
      onInputChange(e);
      setQuantityError("");
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Campo Código (Solo Lectura) */}
      <motion.div variants={itemVariants}>
        <div className="form-control">
          <label className="label">
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Código
            </span>
            <span className="badge badge-warning">Solo Lectura</span>
          </label>
          <motion.input
            type="text"
            name="codigo"
            value={reactiveData.codigo}
            onChange={onInputChange}
            readOnly
            variants={inputVariants}
            whileFocus="focus"
            className="input input-bordered w-full bg-base-300 text-base-content/70 cursor-not-allowed focus:input-warning"
            required
          />
          <label className="label">
            <span className="label-text-alt text-warning">
              El código se genera automáticamente y no puede ser modificado
            </span>
          </label>
        </div>
      </motion.div>

      {/* Campo Nombre */}
      <motion.div variants={itemVariants}>
        <div className="form-control">
          <label className="label">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Nombre del Reactivo
            </span>
            <span className="badge badge-primary">Requerido</span>
          </label>
          <motion.input
            type="text"
            name="nombre"
            value={reactiveData.nombre}
            onChange={onInputChange}
            variants={inputVariants}
            whileFocus="focus"
            placeholder="Ej: Ácido Clorhídrico"
            className="input input-bordered w-full focus:input-primary"
            required
          />
        </div>
      </motion.div>

      {/* Campo Fórmula */}
      <motion.div variants={itemVariants}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <svg
                className="h-4 w-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Fórmula Química
            </span>
            <span className="badge badge-secondary badge-outline">
              Opcional
            </span>
          </label>
          <motion.input
            type="text"
            name="formula"
            value={reactiveData.formula}
            onChange={onInputChange}
            variants={inputVariants}
            whileFocus="focus"
            placeholder="Ej: HCl"
            className="input input-bordered w-full focus:input-secondary"
          />
        </div>
      </motion.div>

      {/* Campo Cantidad - SOLO ENTEROS POSITIVOS */}
      <motion.div variants={itemVariants}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <svg
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              Cantidad Disponible
            </span>
            <span className="badge badge-accent">Números Enteros</span>
          </label>

          <motion.input
            type="number"
            name="cantidad"
            value={reactiveData.cantidad}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            variants={inputVariants}
            whileFocus="focus"
            placeholder="Ej: 10"
            min="0"
            step="0"
            pattern="[0-9]*"
            inputMode="numeric"
            className="input input-bordered w-full focus:input-accent"
            title="Solo números enteros positivos (ej: 1, 10, 156)"
          />

          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Solo se permiten números enteros positivos (ejemplo: 1, 10, 156)
            </span>
          </label>

          {/* Alerta de error con animación */}
          <AnimatePresence mode="wait">
            {quantityError && (
              <motion.div
                className="alert alert-warning mt-2"
                variants={alertVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="font-medium">{quantityError}</span>
                <motion.button
                  className="btn btn-ghost btn-sm btn-circle ml-auto"
                  onClick={() => setQuantityError("")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReactiveBasicInfo;

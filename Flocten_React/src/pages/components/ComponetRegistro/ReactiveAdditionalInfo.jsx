import { motion } from "framer-motion";

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
  initial: { y: 15, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
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

const ReactiveAdditionalInfo = ({ reactiveData, onInputChange }) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Número de Lote */}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Número de Lote
            </span>
            <span className="badge badge-primary badge-outline">Opcional</span>
          </label>
          <motion.input
            type="text"
            name="numeroLote"
            value={reactiveData.numeroLote}
            onChange={onInputChange}
            variants={inputVariants}
            whileFocus="focus"
            placeholder="Ej: L-2024-001"
            className="input input-bordered w-full focus:input-primary"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Identificador del lote de fabricación
            </span>
          </label>
        </div>
      </motion.div>

      {/* Concentración */}
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Concentración
            </span>
            <span className="badge badge-secondary badge-outline">
              Opcional
            </span>
          </label>
          <motion.input
            type="text"
            name="concentracion"
            value={reactiveData.concentracion}
            onChange={onInputChange}
            variants={inputVariants}
            whileFocus="focus"
            placeholder="Ej: 37%, 0.1M, 1N"
            className="input input-bordered w-full focus:input-secondary"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Unidades: %, Molar (M), Normal (N), etc.
            </span>
          </label>
        </div>
      </motion.div>

      {/* Fecha de Registro */}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Fecha de Registro
            </span>
            <span className="badge badge-accent badge-outline">Sistema</span>
          </label>
          <motion.input
            type="text"
            value={
              reactiveData.createdAt
                ? new Date(reactiveData.createdAt).toLocaleDateString()
                : "No disponible"
            }
            readOnly
            className="input input-bordered w-full bg-base-300 text-base-content/70 cursor-not-allowed"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Fecha de creación del registro (no editable)
            </span>
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReactiveAdditionalInfo;

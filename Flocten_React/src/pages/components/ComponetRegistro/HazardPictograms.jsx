import { motion, AnimatePresence } from "framer-motion";
import { HAZARD_PICTOGRAMS } from "../../constants/hazardPictograms";

// Variantes de animación
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  checked: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

const badgeVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3 },
  },
};

const HazardPictograms = ({ selectedPictograms, onPictogramToggle }) => {
  const selectedCount = selectedPictograms.length;

  return (
    <motion.div
      className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:border-primary/30"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-4">
          <motion.h3
            className="card-title text-primary flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="h-5 w-5 text-primary"
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
            </div>
            Pictogramas de Peligro
            <span className="badge badge-primary badge-outline">
              {selectedCount} seleccionados
            </span>
          </motion.h3>

          <AnimatePresence mode="wait">
            {selectedCount > 0 && (
              <motion.div
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                className="badge badge-secondary badge-lg"
              >
                {selectedCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <AnimatePresence>
            {HAZARD_PICTOGRAMS.map((pictogram) => {
              const isChecked = selectedPictograms.includes(pictogram.id);

              return (
                <motion.div
                  key={pictogram.id}
                  variants={itemVariants}
                  whileHover="hover"
                  animate={isChecked ? "checked" : ""}
                  className="relative"
                >
                  <motion.label
                    htmlFor={`pictogram-${pictogram.id}`}
                    className={`
                      cursor-pointer select-none
                      flex flex-col items-center gap-2
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${
                        isChecked
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-base-300 bg-base-200 hover:border-primary/50 hover:bg-primary/5"
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Checkbox personalizado */}
                    <input
                      type="checkbox"
                      id={`pictogram-${pictogram.id}`}
                      checked={isChecked}
                      onChange={() => onPictogramToggle(pictogram.id)}
                      className="peer sr-only"
                    />

                    {/* Icono del pictograma */}
                    <motion.div
                      className="text-3xl sm:text-4xl drop-shadow"
                      animate={isChecked ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {pictogram.icon}
                    </motion.div>

                    {/* Label */}
                    <span
                      className={`
                      text-xs text-center font-medium px-2 py-1 rounded
                      ${
                        isChecked
                          ? "text-primary bg-primary/20"
                          : "text-base-content/70"
                      }
                      transition-colors duration-300
                    `}
                    >
                      {pictogram.label}
                    </span>

                    {/* Checkmark cuando está seleccionado */}
                    <AnimatePresence>
                      {isChecked && (
                        <motion.div
                          className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.label>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mensaje cuando no hay selecciones */}
        <AnimatePresence>
          {selectedCount === 0 && (
            <motion.div
              className="alert alert-warning mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <svg
                className="h-6 w-6"
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
              <span>Selecciona al menos un pictograma de peligro</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HazardPictograms;

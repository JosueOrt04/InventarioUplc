import { motion, AnimatePresence } from "framer-motion";
import { HAZARD_PHRASES } from "../../constants/hazardPhrases";

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
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const phraseCardVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  checked: {
    borderColor: "var(--fallback-error,oklch(var(--er)/0.5))",
    backgroundColor: "var(--fallback-error,oklch(var(--er)/0.1))",
    transition: { duration: 0.2 },
  },
};

const HazardPhrases = ({ selectedPhrases, onPhraseToggle }) => {
  const selectedCount = selectedPhrases.length;

  return (
    <motion.div
      className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:border-error/30"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-4">
          <motion.h3
            className="card-title text-error flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <svg
                className="h-5 w-5 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            Frases de Peligro
            <span className="badge badge-error badge-outline">
              {selectedCount} seleccionadas
            </span>
          </motion.h3>

          <AnimatePresence mode="wait">
            {selectedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="badge badge-error badge-lg"
              >
                {selectedCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {HAZARD_PHRASES.map((phrase) => {
              const isChecked = selectedPhrases.includes(phrase.code);

              return (
                <motion.div
                  key={phrase.code}
                  variants={itemVariants}
                  className="relative"
                >
                  <motion.label
                    htmlFor={`phrase-${phrase.code}`}
                    className={`
                      cursor-pointer select-none
                      flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300
                      ${
                        isChecked
                          ? "border-error bg-error/10 shadow-lg shadow-error/10"
                          : "border-base-300 bg-base-200 hover:border-error/30 hover:bg-error/5"
                      }
                    `}
                    variants={phraseCardVariants}
                    whileHover="hover"
                    animate={isChecked ? "checked" : ""}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Checkbox personalizado */}
                    <input
                      type="checkbox"
                      id={`phrase-${phrase.code}`}
                      checked={isChecked}
                      onChange={() => onPhraseToggle(phrase.code)}
                      className="peer sr-only"
                    />

                    {/* Checkbox visual */}
                    <div
                      className={`
                      w-6 h-6 rounded-md border-2 flex-shrink-0 mt-0.5
                      ${
                        isChecked
                          ? "border-error bg-error"
                          : "border-base-300 bg-base-100"
                      }
                      transition-all duration-300
                      flex items-center justify-center
                    `}
                    >
                      <AnimatePresence>
                        {isChecked && (
                          <motion.svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Contenido de la frase */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`
                          text-sm font-bold
                          ${isChecked ? "text-error" : "text-base-content/80"}
                          transition-colors duration-300
                        `}
                        >
                          {phrase.code}
                        </span>
                        <AnimatePresence>
                          {isChecked && (
                            <motion.span
                              className="badge badge-error badge-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              Seleccionado
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p
                        className={`
                        text-sm leading-relaxed
                        ${
                          isChecked
                            ? "text-error font-medium"
                            : "text-base-content/70"
                        }
                        transition-colors duration-300
                      `}
                      >
                        {phrase.text}
                      </p>
                    </div>
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
              <span>Selecciona las frases de peligro aplicables</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumen de seleccionados */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              className="mt-4 p-4 bg-error/10 rounded-lg border border-error/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold text-error mb-2">
                Seleccionadas:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPhrases.map((code) => {
                  const phrase = HAZARD_PHRASES.find((p) => p.code === code);
                  return (
                    <motion.span
                      key={code}
                      className="badge badge-error badge-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      {code}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HazardPhrases;

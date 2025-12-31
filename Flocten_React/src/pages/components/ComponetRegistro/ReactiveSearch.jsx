import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Variantes de animación
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const searchBarVariants = {
  focus: {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const resultsContainerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const resultItemVariants = {
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
  hover: {
    x: 5,
    backgroundColor: "var(--fallback-primary,oklch(var(--p)/0.1))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  exit: { x: 20, opacity: 0 },
};

const emptyStateVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const ReactiveSearch = ({
  searchTerm,
  searchResults,
  showSearchResults,
  searchLoading,
  error,
  onSearchTermChange,
  onSearch,
  onSelectReactive,
  onShowResultsChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onShowResultsChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onShowResultsChange]);

  const hasResults = searchResults.length > 0;

  return (
    <motion.div
      className="mb-6 relative"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      ref={containerRef}
    >
      <motion.div
        className="flex gap-2"
        variants={searchBarVariants}
        whileFocus="focus"
      >
        <div className="flex-1 form-control relative">
          <input
            type="text"
            placeholder="Buscar reactivo por código o nombre..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
            onFocus={() => {
              setIsFocused(true);
              onShowResultsChange(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            className="input input-bordered w-full pr-12"
            disabled={searchLoading}
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchTermChange("");
                  onShowResultsChange(false);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400 }}
                title="Limpiar búsqueda"
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={onSearch}
          disabled={searchLoading || !searchTerm.trim()}
          className="btn btn-primary gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          whileFocus={{ scale: 1.02 }}
        >
          <AnimatePresence mode="wait">
            {searchLoading ? (
              <motion.span
                key="loading"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="loading loading-spinner loading-sm"
                  variants={loadingVariants}
                  animate="animate"
                />
                Buscando...
              </motion.span>
            ) : (
              <motion.span
                key="search"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Buscar
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mensaje de error */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="alert alert-error mt-2 shadow-lg border border-error/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados de búsqueda */}
      <AnimatePresence>
        {showSearchResults && (
          <motion.div
            className="absolute z-50 mt-2 w-full"
            variants={resultsContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="card bg-base-100 shadow-2xl border border-base-300 max-h-80 overflow-y-auto rounded-xl">
              <div className="card-body p-2">
                <div className="flex items-center justify-between p-2 sticky top-0 bg-base-100 z-10 border-b border-base-300">
                  <span className="text-sm text-base-content/70">
                    {hasResults
                      ? `${searchResults.length} resultados encontrados`
                      : "Sin resultados"}
                  </span>
                  <motion.button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => onShowResultsChange(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {hasResults ? (
                    <div className="space-y-1 py-2">
                      {searchResults.map((reactive, index) => (
                        <motion.div
                          key={reactive._id}
                          variants={resultItemVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          whileHover="hover"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onSelectReactive(reactive);
                            onShowResultsChange(false);
                          }}
                          className="cursor-pointer"
                          style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors gap-3 mx-1">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">
                                  {reactive.codigo?.slice(0, 3).toUpperCase() ||
                                    "?"}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm truncate">
                                  {reactive.nombre}
                                </p>
                                <p className="text-xs text-base-content/70 truncate">
                                  Código: {reactive.codigo}
                                </p>
                              </div>
                            </div>
                            <svg
                              className="h-5 w-5 text-primary flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      className="text-center py-8"
                      variants={emptyStateVariants}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <svg
                        className="h-12 w-12 text-base-content/40 mx-auto mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="text-base-content/60">
                        No se encontraron reactivos con ese término
                      </p>
                      <p className="text-sm text-base-content/50 mt-1">
                        Intenta con otro código o nombre
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReactiveSearch;

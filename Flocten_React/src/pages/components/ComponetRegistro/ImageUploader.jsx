import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const progressVariants = {
  initial: { width: 0 },
  animate: (progress) => ({
    width: `${progress}%`,
    transition: { duration: 0.5, ease: "easeOut" },
  }),
};

const noImageVariants = {
  initial: { opacity: 0.5 },
  animate: { opacity: 0.7 },
  hover: {
    opacity: 0.9,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 },
  },
};

const ImageUploader = ({
  label,
  fieldName,
  imageUrl,
  uploadProgress,
  onImageUpload,
}) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover={{ y: -2 }}
    >
      <div className="card-body p-5 space-y-4">
        <motion.h3
          className="card-title text-base-content text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.h3>

        {/* Vista previa de imagen o placeholder */}
        <div className="flex justify-center items-center min-h-40 bg-base-200 rounded-lg border-2 border-dashed border-base-300 overflow-hidden">
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <motion.img
                key="image"
                src={imageUrl}
                alt={label}
                className="w-full h-40 object-contain rounded-lg"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover="hover"
              />
            ) : (
              <motion.div
                key="placeholder"
                variants={noImageVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-col items-center justify-center p-6"
              >
                <svg
                  className="h-12 w-12 text-base-content/40 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-base-content/60 text-center">
                  Sin imagen
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input file con estilo DaisyUI */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.label
            htmlFor={`file-input-${fieldName}`}
            className="btn btn-block btn-outline gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {imageUrl ? "Cambiar Imagen" : "Seleccionar Imagen"}
          </motion.label>
          <input
            id={`file-input-${fieldName}`}
            type="file"
            onChange={(e) => onImageUpload(e, fieldName)}
            className="hidden"
            accept="image/*"
          />
        </motion.div>

        {/* Barra de progreso */}
        <AnimatePresence>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between text-xs text-base-content/70">
                <span>Subiendo...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="progress progress-primary w-full h-2">
                <motion.div
                  className="progress-primary"
                  style={{ width: `${uploadProgress}%` }}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  custom={uploadProgress}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ImageUploader;

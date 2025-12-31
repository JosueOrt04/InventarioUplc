import { motion, AnimatePresence } from "framer-motion";
import ReactiveSearch from "../components/ComponetRegistro/ReactiveSearch";
import ReactiveBasicInfo from "../components/ComponetRegistro/ReactiveBasicInfo";
import ReactiveAdditionalInfo from "../components/ComponetRegistro/ReactiveAdditionalInfo";
import ImageUploader from "../components/ComponetRegistro/ImageUploader";
import TextAreaField from "../components/ComponetRegistro/TextAreaField";
import HazardPictograms from "../components/ComponetRegistro/HazardPictograms";
import HazardPhrases from "../components/ComponetRegistro/HazardPhrases";
import { useReactiveForm } from "../components/ComponetRegistro/hooks/useReactiveForm";
import Header_Ractivos from "../components/Componen_Quimico/Header_Ractivos";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// ✅ TODAS las variantes definidas y corregidas
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.15,
    },
  },
  exit: { opacity: 0, y: -30 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// ✅ FALTANTE: itemVariants definida
const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, y: -20 },
};

const sectionTitleVariants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
  loading: {
    scale: 0.98,
    opacity: 0.7,
  },
};

const alertVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const RegistroQuimico = ({ reactiveId, onClose }) => {
  const { authUser, hasPermission } = useAuthStore();
  const {
    reactiveData,
    loading,
    saving,
    deleting,
    error,
    success,
    successMessage,
    uploadProgress,
    searchTerm,
    searchResults,
    showSearchResults,
    searchLoading,
    showDeleteConfirm,
    handleSearch,
    handleSelectReactive,
    handleInputChange,
    handlePictogramToggle,
    handleHazardPhraseToggle,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    setSearchTerm,
    setShowSearchResults,
  } = useReactiveForm(reactiveId, onClose);

  // 🚫 Pantalla de acceso denegado
  if (!hasPermission("modificacion")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300"
        >
          <div className="card-body text-center">
            <motion.div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-error/10"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                className="h-10 w-10 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-error mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Acceso Denegado
            </motion.h1>
            <motion.p
              className="text-base-content/70 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              No tienes permisos para registrar nuevos ítems.
            </motion.p>
            <motion.p
              className="text-sm text-base-content/60 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Solicita acceso a tu asesor o administrador autorizado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Link to="/home" className="btn btn-primary btn-block gap-2">
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Regresar al Inicio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // 🌀 Pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex flex-col items-center justify-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.2,
          }}
          className="rounded-full h-20 w-20 border-t-4 border-b-4 border-primary border-l-4 border-l-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xl font-semibold text-base-content/80"
        >
          Cargando datos del reactivo...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="mt-4 h-1 bg-base-300 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header_Ractivos authUser={authUser} />

      {/* 🧭 Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-300% animate-gradient">
            {reactiveData.codigo
              ? "Editar Reactivo"
              : "Modificar Reactivo"}
          </h2>
          <p className="text-base-content/70 mt-3 text-lg">
            {reactiveData.codigo
              ? `Modificando: ${reactiveData.nombre}`
              : "Completa toda la información requerida"}
          </p>
        </motion.div>

        {/* 🔍 Buscador */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ReactiveSearch
            searchTerm={searchTerm}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            searchLoading={searchLoading}
            error={error}
            success={success}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearch}
            onSelectReactive={handleSelectReactive}
            onShowResultsChange={setShowSearchResults}
          />
        </motion.div>

        {/* 📢 Alertas animadas */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              variants={alertVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="error-alert"
              className="alert alert-error mt-4 shadow-2xl border border-error/30"
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
              <span className="text-sm font-medium flex-1">{error}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toast.dismiss()}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </motion.button>
            </motion.div>
          )}

          {success && (
            <motion.div
              variants={alertVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="success-alert"
              className="alert alert-success mt-4 shadow-2xl border border-success/30"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium flex-1">
                {successMessage}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toast.dismiss()}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📝 Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-8"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {/* 🧩 Información básica y adicional */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={cardVariants} whileHover="hover">
              <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:border-primary/30">
                <div className="card-body p-6">
                  <motion.h3
                    className="card-title text-primary mb-4 flex items-center gap-3"
                    variants={sectionTitleVariants}
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    Información Básica
                    <span className="badge badge-primary badge-outline">
                      Requerido
                    </span>
                  </motion.h3>
                  <ReactiveBasicInfo
                    reactiveData={reactiveData}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:border-secondary/30">
                <div className="card-body p-6">
                  <motion.h3
                    className="card-title text-secondary mb-4 flex items-center gap-3"
                    variants={sectionTitleVariants}
                  >
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    Información Adicional
                    <span className="badge badge-secondary badge-outline">
                      Opcional
                    </span>
                  </motion.h3>
                  <ReactiveAdditionalInfo
                    reactiveData={reactiveData}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* 🖼️ Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <ImageUploader
                label="Imagen del Reactivo"
                fieldName="imagenReactivo"
                imageUrl={reactiveData.imagenReactivo}
                uploadProgress={uploadProgress}
                onImageUpload={handleImageUpload}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ImageUploader
                label="Imagen del Símbolo"
                fieldName="imagenSimbolo"
                imageUrl={reactiveData.imagenSimbolo}
                uploadProgress={uploadProgress}
                onImageUpload={handleImageUpload}
              />
            </motion.div>
          </div>

          {/* 📝 Campos de texto */}
          <motion.div variants={itemVariants}>
            <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:border-accent/30">
              <div className="card-body p-6 space-y-5">
                <motion.h3
                  className="card-title text-accent mb-2 flex items-center gap-3"
                  variants={sectionTitleVariants}
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-accent"
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
                  </div>
                  Descripciones y Normativas
                </motion.h3>
                <TextAreaField
                  label="Descripción"
                  name="descripcion"
                  value={reactiveData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe las características del reactivo..."
                />
                <TextAreaField
                  label="Primeros Auxilios"
                  name="primerosAuxilios"
                  value={reactiveData.primerosAuxilios}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Procedimientos de primeros auxilios..."
                />
                <TextAreaField
                  label="Manejo Seguro"
                  name="manejoSeguro"
                  value={reactiveData.manejoSeguro}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Indicaciones para un manejo seguro..."
                />
              </div>
            </div>
          </motion.div>

          {/* ☣️ Pictogramas y Frases */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <HazardPictograms
                selectedPictograms={reactiveData.pictogramasPeligro}
                onPictogramToggle={handlePictogramToggle}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <HazardPhrases
                selectedPhrases={reactiveData.frasesPeligro}
                onPhraseToggle={handleHazardPhraseToggle}
              />
            </motion.div>
          </div>

          {/* ⚙️ Botones */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 border-t border-base-300"
            variants={itemVariants}
          >
            {/* Botón eliminar */}
            <AnimatePresence mode="wait">
              {hasPermission("eliminacion") && reactiveData.codigo && (
                <motion.button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting || saving}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={deleting ? "loading" : ""}
                  exit={{ opacity: 0, x: -50 }}
                  className="btn btn-error gap-3 w-full lg:w-auto"
                >
                  <AnimatePresence mode="wait">
                    {deleting ? (
                      <motion.span
                        key="deleting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <span className="loading loading-spinner loading-sm"></span>
                        Eliminando...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="delete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Eliminar Reactivo
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <motion.button
                type="button"
                onClick={onClose}
                disabled={saving || deleting}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn btn-outline gap-2 w-full sm:w-auto"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancelar
              </motion.button>
              <motion.button
                type="submit"
                disabled={saving || deleting}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={saving ? "loading" : ""}
                className="btn btn-primary gap-2 w-full sm:w-auto"
              >
                <AnimatePresence mode="wait">
                  {saving ? (
                    <motion.span
                      key="saving"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="loading loading-spinner loading-sm"></span>
                      Guardando...
                    </motion.span>
                  ) : reactiveData.codigo ? (
                    <motion.span
                      key="update"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Guardar Cambios
                    </motion.span>
                  ) : (
                    <motion.span
                      key="create"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Registrar Reactivo
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.form>
      </div>

      {/* 🧱 Modal de eliminación con animación mejorada */}
      <AnimatePresence mode="wait">
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={cancelDelete}
          >
            <motion.div
              variants={modalContentVariants}
              className="card w-full max-w-lg bg-base-100 shadow-2xl border border-error/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-body p-8">
                <motion.div
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="mr-4"
                  >
                    <svg
                      className="h-10 w-10 text-error"
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
                  </motion.div>
                  <h3 className="card-title text-error text-2xl">
                    Confirmar Eliminación
                  </h3>
                </motion.div>

                <motion.p
                  className="text-base-content/80 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  ¿Deseas eliminar el reactivo{" "}
                  <motion.strong
                    className="text-error font-bold"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {reactiveData.nombre}
                  </motion.strong>{" "}
                  ?
                </motion.p>

                <motion.div
                  className="alert alert-error mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <div>
                    <p className="font-bold">
                      Esta acción no se puede deshacer
                    </p>
                    <p className="text-sm">
                      Se eliminará permanentemente el reactivo y todos sus datos
                      asociados
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="card-actions justify-end gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={cancelDelete}
                    disabled={deleting}
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="btn btn-error gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <AnimatePresence mode="wait">
                      {deleting ? (
                        <motion.span
                          key="deleting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="loading loading-spinner loading-sm"></span>
                          Eliminando...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="confirm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Sí, Eliminar
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegistroQuimico;

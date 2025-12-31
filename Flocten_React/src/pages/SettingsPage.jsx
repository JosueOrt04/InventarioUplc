import { motion, AnimatePresence } from "framer-motion";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const PREVIEW_MESSAGES = [
  { id: 1, content: "¡Hola! ¿Cómo estás?", isSent: false },
  {
    id: 2,
    content: "¡Excelente! Estoy trabajando en nuevas funciones.",
    isSent: true,
  },
  { id: 3, content: "Se ve genial ✨", isSent: false },
];

const ThemeCard = ({ theme, isActive, onClick }) => {
  return (
    <motion.button
      layout
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden rounded-xl p-3 transition-all duration-300
        ${
          isActive
            ? "ring-2 ring-primary shadow-lg shadow-primary/20"
            : "hover:shadow-md hover:shadow-base-content/10"
        }
      `}
      data-theme={theme}
    >
      {/* Vista previa de colores */}
      <div className="relative h-20 w-full rounded-lg overflow-hidden mb-2">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
          <div className="rounded bg-primary"></div>
          <div className="rounded bg-secondary"></div>
          <div className="rounded bg-accent"></div>
          <div className="rounded bg-neutral"></div>
        </div>

        {/* Overlay de selección */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="text-primary-content bg-primary rounded-full p-2"
              >
                <svg
                  className="w-5 h-5"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nombre del tema */}
      <motion.span
        className={`
          text-xs font-semibold block text-center transition-colors
          ${
            isActive
              ? "text-primary"
              : "text-base-content/70 group-hover:text-base-content"
          }
        `}
        animate={{ fontWeight: isActive ? 700 : 600 }}
      >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </motion.span>

      {/* Badge de activo */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-2 -right-2 bg-primary text-primary-content text-[10px] px-2 py-1 rounded-full font-bold"
          >
            ACTIVO
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const ProfilePreview = ({ theme }) => {
  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl shadow-xl overflow-hidden"
      data-theme={theme}
    >
      {/* Header con gradiente */}
      <div className="relative h-32 bg-gradient-to-br from-primary to-secondary"></div>

      {/* Contenido del perfil */}
      <div className="bg-base-100 px-6 pb-6">
        {/* Avatar - posicionado sobre el header */}
        <motion.div
          className="relative -mt-16 mb-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <div className="w-24 h-24 rounded-full bg-base-100 p-1 shadow-lg">
            <img
              src="https://ui-avatars.com/api/?background=random&name=Alex+Rivera&size=96"
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Indicador online */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-4 border-base-100"></div>
        </motion.div>

        {/* Nombre y username */}
        <motion.h3
          className="text-2xl font-bold text-base-content mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Alex Rivera
        </motion.h3>
        <motion.p
          className="text-secondary font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          @alexr_dev
        </motion.p>

        {/* Bio */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-base-content/80 leading-relaxed">
            Desarrollador Full Stack | Amante del diseño UI/UX | Creando
            experiencias digitales únicas ✨
          </p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="flex justify-around py-4 border-y border-base-300 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring" }}
        >
          <div className="text-center">
            <span className="block text-lg font-bold text-base-content">
              247
            </span>
            <span className="text-xs text-base-content/70">Posts</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-base-content">
              12.3k
            </span>
            <span className="text-xs text-base-content/70">Seguidores</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-base-content">
              892
            </span>
            <span className="text-xs text-base-content/70">Siguiendo</span>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary flex-1"
          >
            Seguir
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline flex-1"
          >
            Mensaje
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ThemeSettings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Apariencia
          </h1>
          <p className="text-base-content/70">
            Personaliza la apariencia de tu perfil
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selector de temas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold text-base-content">Tema</h2>
              </div>

              <p className="text-sm text-base-content/70 mb-6">
                Elige un tema para tu interfaz de perfil
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {THEMES.map((t) => (
                  <ThemeCard
                    key={t}
                    theme={t}
                    isActive={theme === t}
                    onClick={() => setTheme(t)}
                  />
                ))}
              </div>
            </div>

            {/* Información adicional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-base-100 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-base-content mb-2">
                💡 Consejo
              </h3>
              <p className="text-sm text-base-content/70">
                Los cambios se aplican automáticamente. Puedes cambiar de tema
                en cualquier momento.
              </p>
            </motion.div>
          </motion.div>

          {/* Vista previa del perfil */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h2 className="text-xl font-bold text-base-content">
                Vista Previa
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <ProfilePreview key={theme} theme={theme} />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

// src/components/auth/SignHeader.jsx

import { motion } from "framer-motion";
import LaBoritiLog from "../../../../../public/img/LaBoritiLog.png";

const SignHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-10"
    >
      {/* Logo con mejor diseño */}
      <motion.div
        className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg mb-6 group cursor-pointer"
        whileHover={{
          scale: 1.05,
          rotate: [0, -2, 2, -2, 0],
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-2 bg-white rounded-2xl shadow-inner">
          <img
            src={LaBoritiLog}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-all duration-300 group-hover:scale-110"
            alt="Logo LaBoriti - Laboratorio Clínico"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Título principal */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Bienvenido
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="text-base-content/70 text-base sm:text-lg max-w-sm mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
           Regístrate como estudiante de laboratorio clínico
      </motion.p>

      {/* Línea decorativa */}
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default SignHeader;

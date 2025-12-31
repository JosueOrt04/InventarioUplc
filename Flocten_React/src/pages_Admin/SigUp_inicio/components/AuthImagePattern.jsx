// src/pages/SigUp_inicio/components/AuthImagePattern.jsx

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Lab_Primero from "../../../public/img/Lab_Primero.png";// Verifica tu ruta

export const AuthImagePattern = ({ title, subtitle }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      className="hidden lg:flex lg:items-center lg:justify-center relative overflow-hidden h-full"
    >
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 z-10" />
      
      {/* Imagen con loading state */}
      <motion.img
        src={Lab_Primero}
        alt="Instalaciones"
        className="h-full w-full object-cover absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7 }}
        onLoad={() => setIsLoadingImage(false)}
      />
      
      <AnimatePresence>
        {isLoadingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-base-200 animate-pulse z-20"
          />
        )}
      </AnimatePresence>

      {/* Tarjeta informativa flotante */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-12 left-12 right-12 z-20"
      >
        <div className="bg-base-100/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-base-300/50 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            {title}
          </h3>
          <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
          
          {/* Indicadores animados */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: dot * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
// src/pages/SignUpPage.jsx

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Lab_Primero from '../public/img/Lab_Primero.png';
import { SignUpForm } from './Componente_Acceso/sign_Login/constants/auth/SignUpForm';

export const SignUpPage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    if (authUser) {
      const redirectPath = authUser.role === "admin" ? "/home-admin" : "/home";
      navigate(redirectPath);
    }
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/5">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        {/* ======================================================= */}
        {/* LADO IZQUIERDO: FORMULARIO DE REGISTRO                */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-16 xl:px-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-full max-w-sm sm:max-w-md"
          >
            <SignUpForm />
          </motion.div>
        </motion.div>

        {/* ======================================================= */}
        {/* LADO DERECHO: IMAGEN DE PRESENTACIÓN                   */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
          className="hidden lg:flex lg:items-center lg:justify-center relative overflow-hidden"
        >
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 z-10" />
          
          {/* Imagen con loading state */}
          <motion.img
            src={Lab_Primero}
            alt="Modernas instalaciones del laboratorio clínico"
            className="h-full w-full object-cover"
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

          {/* Tarjeta informativa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-8 right-8 z-20"
          >
            <div className="bg-base-100/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-base-300/50 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Únete a la Plataforma
              </h3>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                Forma parte de la comunidad educativa líder en laboratorio clínico
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
      </div>
    </div>
  );
};

export default SignUpPage;
// src/pages/LoginPage.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LoginHeader from "./Componente_Acceso/Auth_Login/LoginHeader";
import LoginForm from "./Componente_Acceso/Auth_Login/LoginForm";
import AuthRedirect from "./Componente_Acceso/Auth_Login/AuthRedirect";
import Lab_Primero from "../public/img/Lab_Primero.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const LoginPage = () => {
  const { login, isLoggingIn, error, authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      const route = authUser.role === "admin" ? "/home-admin" : "/home";
      navigate(route, { replace: true });
    }
  }, [authUser, navigate]);

  return (
    <div className=" min-h-screen from-base-100 via-base-200 to-primary/5">
      <div className="min-h-screen lg:grid lg:grid-cols-2 ">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col justify-center px-6 py-8 sm:px-8 sm:py-12 md:px-10 lg:px-16 xl:px-24 order-2 lg:order-1"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-sm sm:max-w-md space-y-8"
          >
            <LoginHeader />

            <motion.div
              className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="card-body p-6 sm:p-8">
                <LoginForm
                  onLogin={login}
                  isLoggingIn={isLoggingIn}
                  error={error}
                />

                <div className="divider text-sm text-base-content/50 my-6">
                  ¿No tienes cuenta?
                </div>

                <motion.div variants={containerVariants} className="space-y-4">
                  
                  <AuthRedirect
                    text="¿Administrador?"
                    linkText="Acceso administrativo"
                    to="/admin"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* LADO DERECHO: IMAGEN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="hidden lg:flex lg:items-center lg:justify-center relative overflow-hidden order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 z-10" />

          <motion.img
            src={Lab_Primero}
            alt="Instalaciones modernas del laboratorio clínico"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />

          <div className="absolute bottom-8 left-8 right-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="bg-base-100/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-base-200 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Plataforma Educativa
              </h3>
              <p className="text-base-content/70 text-sm sm:text-base">
                Accede a recursos especializados, practicas virtuales y
                herramientas exclusivas para tu formación en laboratorio clínico
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

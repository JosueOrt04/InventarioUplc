// src/pages/SigUp_Admin.jsx

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Asumiendo que usas el mismo store
import { SignUpAdminForm } from "./SigUp_inicio/components/SignUpAdminForm";
import { AuthImagePattern } from "./SigUp_inicio/components/AuthImagePattern";

const SignUpAdminPage = () => {
  // Lógica de redirección si ya está logueado (opcional, igual que en tu ejemplo)
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/login"); // O la ruta que corresponda
    }
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/5">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        {/* ======================================================= */}
        {/* LADO IZQUIERDO: FORMULARIO DE REGISTRO ADMIN           */}
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
            <SignUpAdminForm />
  
          </motion.div>
        </motion.div>

        {/* ======================================================= */}
        {/* LADO DERECHO: IMAGEN Y PRESENTACIÓN                    */}
        {/* ======================================================= */}
        <AuthImagePattern
          title="Área Administrativa"
          subtitle="Gestión y control integral de la plataforma clínica."
        />
      </div>
      
    </div>
  );
};

export default SignUpAdminPage;

import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import ProfileHeader from "./Componente_Acceso/Perfil_Com/ProfileHeader";
import ProfileMainCard from "./Componente_Acceso/Perfil_Com/ProfileMainCard";
import ProfileSidebar from "./Componente_Acceso/Perfil_Com/ProfileSidebar";
import { fadeInVariants } from "./Componente_Acceso/Perfil_Com/animationVariants";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga o verificar cuando authUser está listo
    if (authUser !== undefined) {
      setLoading(false);
    }
  }, [authUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="alert alert-warning">
        No hay usuario autenticado. Por favor inicia sesión.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <motion.div
        className="container mx-auto max-w-4xl px-4"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <ProfileHeader />
        <div className="grid lg:grid-cols-3 gap-6">
          <ProfileMainCard authUser={authUser} />
          <ProfileSidebar />
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;

import { motion } from "framer-motion";
import { statVariants } from "./animationVariants";
import { useState } from "react";
import EditProfileModal from "./Edit_compo/EditProfileModal";
import ChangePasswordModal from "./Edit_compo/ChangePasswordModal";

const ProfileSidebar = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card-body">
          <h3 className="card-title text-lg">Acciones Rápidas</h3>
          <div className="mt-4 space-y-3">
            <motion.button
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowEditModal(true)}
            >
              Editar Perfil
            </motion.button>
            <motion.button
              className="btn btn-outline w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPasswordModal(true)}
            >
              Cambiar Contraseña
            </motion.button>
           
          </div>
        </div>
      </motion.div>

      {/* Modales */}
      <EditProfileModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
      <ChangePasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </>
  );
};



const StatCard = ({ value, label }) => (
  <div className="p-3 bg-base-200 rounded-lg">
    <span className="block text-2xl font-bold text-primary">{value}</span>
    <span className="text-xs text-base-content/70">{label}</span>
  </div>
);

export default ProfileSidebar;

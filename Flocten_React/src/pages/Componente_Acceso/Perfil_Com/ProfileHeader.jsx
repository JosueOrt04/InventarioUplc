import { motion } from "framer-motion";

const ProfileHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.h1
        className="text-4xl font-bold text-base-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mi Perfil
      </motion.h1>
      <motion.p
        className="text-base-content/70 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Gestiona tu información personal
      </motion.p>
    </div>
  );
};

export default ProfileHeader;

import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../../../store/useAuthStore";

const ProfileNotifications = () => {
  const { error, success, clearMessages } = useAuthStore(); // Necesitarías agregar estos estados a tu store

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="alert alert-error shadow-lg"
        >
          <span>{error}</span>
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="alert alert-success shadow-lg"
        >
          <span>{success}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileNotifications;

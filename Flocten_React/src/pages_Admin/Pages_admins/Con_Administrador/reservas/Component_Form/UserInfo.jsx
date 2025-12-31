import React from "react";
import { motion } from "framer-motion";

export const UserInfo = ({ user }) => {
  if (!user?.profilePic) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center space-x-4 mb-6 p-3 rounded-xl bg-secondary-content shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <motion.img
        src={user.profilePic}
        alt={user.fullName}
        className="w-14 h-14 object-cover rounded-full border-2 bg-secondary-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      />
      <motion.span
        className="text-sm font-semibold text-gray-800"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {user.fullName}
      </motion.span>
    </motion.div>
  );
};

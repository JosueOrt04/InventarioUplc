// src/components/auth/AuthRedirect.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthRedirect = ({
  text = "¿No tienes una cuenta?",
  linkText = "Crear cuenta",
  to = "/signup",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <p className="text-base-content/70 text-sm sm:text-base">
        {text}{" "}
        <Link
          to={to}
          className="link link-primary font-semibold hover:link-secondary transition-colors duration-200"
        >
          {linkText}
        </Link>
      </p>
    </motion.div>
  );
};

export default AuthRedirect;

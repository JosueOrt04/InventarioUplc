import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const AccountInfo = ({ authUser }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Fecha inválida"
        : date.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
    } catch (error) {
      return "Error en fecha";
    }
  };

  return (
    <motion.div
      className="mt-8 card bg-base-200 border border-base-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="card-body p-4">
        <h3 className="card-title text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Información de Cuenta
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-base-300">
            <span className="text-base-content/70">Miembro desde</span>
            <span className="font-medium text-base-content">
              {formatDate(authUser?.createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-base-content/70">Estado</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">Activo</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountInfo;

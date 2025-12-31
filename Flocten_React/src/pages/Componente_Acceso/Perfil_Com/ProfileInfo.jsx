import { motion } from "framer-motion";
import { User, ShieldCheck, Mail } from "lucide-react";
import { fadeInVariants } from "./animationVariants";

const ProfileInfo = ({ authUser }) => {
  return (
    <div className="space-y-6">
      <InfoField
        icon={User}
        label="Nombre Completo"
        value={authUser?.fullName || "No disponible"}
      />
      <InfoField
        icon={ShieldCheck}
        label="Rol"
        value={authUser?.role || "No disponible"}
        isBadge={true}
      />
      <InfoField
        icon={Mail}
        label="Número de Control"
        value={authUser?.controlNumber || "No disponible"}
        isMono={true}
      />
    </div>
  );
};

const InfoField = ({
  icon: Icon,
  label,
  value,
  isBadge = false,
  isMono = false,
}) => (
  <motion.div
    variants={fadeInVariants}
    initial="hidden"
    animate="visible"
    className="form-control"
  >
    <label className="label">
      <span className="label-text flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        {label}
      </span>
    </label>
    <div
      className={`px-4 py-3 bg-base-200 rounded-lg border border-base-300 ${
        isMono ? "font-mono" : "font-medium"
      } text-base-content`}
    >
      {isBadge ? (
        <span className="badge badge-primary badge-outline font-medium">
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  </motion.div>
);

export default ProfileInfo;

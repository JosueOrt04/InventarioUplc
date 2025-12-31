// components/Con_Administrador/UserInfo.jsx
import React from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { User2 } from "lucide-react";

export const UserInfo = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
      <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-lg">
        <User2 className="w-4 h-4 text-primary" />
        <span className="text-base-content/70">No. Control:</span>
        <span className="font-semibold">{authUser?.controlNumber || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-lg">
        <User2 className="w-4 h-4 text-secondary" />
        <span className="text-base-content/70">Usuario:</span>
        <span className="font-semibold">{authUser?.fullName || "No disponible"}</span>
      </div>
    </div>
  );
};
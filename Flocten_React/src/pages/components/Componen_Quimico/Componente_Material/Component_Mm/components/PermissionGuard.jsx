import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../../../store/useAuthStore.js";

const PermissionGuard = ({ children, permission }) => {
  const { hasPermission } = useAuthStore();

  if (!hasPermission(permission)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-error">Acceso Denegado</h1>
          <p className="mt-4 text-gray-600">
            No tienes permisos para modificar herramientas.
          </p>
          <Link to="/home" className="btn btn-primary mt-6 w-full">
            Regresar al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default PermissionGuard;

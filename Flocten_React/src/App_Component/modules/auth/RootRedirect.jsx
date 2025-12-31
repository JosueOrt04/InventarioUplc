// RootRedirect.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export const RootRedirect = () => {
  const location = useLocation();
  const { authUser, isBlocked } = useAuthStore();

  // Si ya está en una ruta específica (no la raíz), mantenerse ahí
  if (location.pathname !== "/") {
    return <Navigate to={location.pathname} replace />;
  }

  // Lógica original de redirección solo para la raíz
  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Redirigir según el rol solo desde la raíz
  return authUser.role === "admin" ? (
    <Navigate to="/home-admin" replace />
  ) : (
    <Navigate to="/home" replace />
  );
};

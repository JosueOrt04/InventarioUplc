// useAuthManager.jsx
import { useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Navigate } from "react-router-dom";

export const useAuthManager = () => {
  const { authUser, checkAuth, isCheckingAuth, isBlocked } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { authUser, isCheckingAuth, isBlocked };
};

// Componente para redirecciones basadas en rol - MODIFICADO
export const RoleBasedRedirect = ({ authUser, isBlocked }) => {
  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  if (!authUser) return <Navigate to="/login" replace />;

  return authUser.role === "admin" ? (
    <Navigate to="/home-admin" replace />
  ) : (
    <Navigate to="/home" replace />
  );
};
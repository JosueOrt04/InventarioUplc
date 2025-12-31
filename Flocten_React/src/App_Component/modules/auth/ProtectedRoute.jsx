import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; // o <LoadingSpinner />

  if (!authUser) return <Navigate to="/login" replace />;
  if (authUser.blocked) return <Navigate to="/bloqueado" replace />;

  return children;
};
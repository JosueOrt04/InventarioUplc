import { Navigate } from 'react-router-dom';
import { useAuthStore } from "../../../store/useAuthStore";

const RouteGuard = ({ authUser, allowedRoles, redirectTo, children }) => {
  const { isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null; // o <LoadingSpinner />
  }

  // Usuario no autenticado intentando acceder a rutas privadas
  if (!authUser && allowedRoles.length > 0) {
    return <Navigate to={redirectTo} replace />;
  }

  // Usuario sí autenticado pero sin permisos
  if (authUser && allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RouteGuard;

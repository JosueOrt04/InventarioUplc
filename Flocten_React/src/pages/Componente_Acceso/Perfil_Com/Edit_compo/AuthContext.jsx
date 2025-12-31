import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../../../../lib/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para actualizar datos específicos del usuario
  const updateUser = (updatedData) => {
    setAuthUser((prev) => {
      if (!prev) return updatedData;
      return {
        ...prev,
        ...updatedData,
      };
    });
  };

  // AuthContext.jsx - Actualizar la función refreshUser
  const refreshUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data) {
        const userData = res.data.user || res.data;
        setAuthUser(userData);
        return userData;
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      throw error;
    }
  };

  // Añadir esta función para forzar re-render
  const forceUpdate = () => {
    setAuthUser((prev) => (prev ? { ...prev } : null));
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      setAuthUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.data) {
          setAuthUser(res.data.user || res.data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    authUser,
    setAuthUser,
    updateUser,
    refreshUser,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

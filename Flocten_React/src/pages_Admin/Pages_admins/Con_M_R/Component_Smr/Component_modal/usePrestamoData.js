import { useState, useEffect } from "react";
import { axiosInstance } from "../../../../../lib/axios";
import toast from "react-hot-toast";

export const usePrestamoData = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [reactivos, setReactivos] = useState([]);
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [usuariosRes, reactivosRes, herramientasRes] = await Promise.all([
        axiosInstance.get("/AdminContro/users"),
        axiosInstance.get("/AdminContro/reactivos"),
        axiosInstance.get("/AdminContro/herramientas")
      ]);

      setUsuarios(usuariosRes.data.users || []);
      setReactivos(reactivosRes.data.reactivos || []);
      setHerramientas(herramientasRes.data.herramientas || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return {
    usuarios,
    reactivos,
    herramientas,
    loading
  };
};
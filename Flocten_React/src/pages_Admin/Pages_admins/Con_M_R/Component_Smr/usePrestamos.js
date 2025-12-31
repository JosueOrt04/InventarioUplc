// hooks/usePrestamos.js
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../../lib/axios";
import toast from "react-hot-toast";

export const usePrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los préstamos
  const obtenerPrestamos = async (filtros = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filtros).toString();
      const response = await axiosInstance.get(
        `/AdminContro/prestamos?${params}`
      );
      setPrestamos(response.data.prestamos);
      setError(null);
    } catch (err) {
      setError("Error al obtener préstamos");
      toast.error("Error al cargar préstamos");
    } finally {
      setLoading(false);
    }
  };

  // Obtener estadísticas
  const obtenerEstadisticas = async () => {
    try {
      const response = await axiosInstance.get(
        "/AdminContro/prestamos/estadisticas"
      );
      setEstadisticas(response.data);
    } catch (err) {
      console.error("Error al obtener estadísticas:", err);
    }
  };

  // Registrar préstamo
  const registrarPrestamo = async (datosPrestamo) => {
    try {
    

      const config =
        datosPrestamo instanceof FormData
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : {};

      const response = await axiosInstance.post(
        "/AdminContro/prestamos",
        datosPrestamo,
        config
      );

     
      toast.success("Préstamo registrado correctamente");
      await obtenerPrestamos();
      await obtenerEstadisticas();
      return response.data;
    } catch (err) {
      console.error("❌ Error en registrarPrestamo:", err);
      console.error("❌ Detalles del error:", err.response?.data);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al registrar préstamo";
      toast.error(errorMessage);
      throw err;
    }
  };

  // Registrar devolución (CORREGIDO)
  const registrarDevolucion = async (prestamoId, datosDevolucion) => {
    try {
     

      // ✅ Configurar headers para FormData si es necesario
      const config =
        datosDevolucion instanceof FormData
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : {};

      const response = await axiosInstance.put(
        `/AdminContro/prestamos/devolver/${prestamoId}`,
        datosDevolucion,
        config
      );

    
      toast.success("Devolución registrada correctamente");
      await obtenerPrestamos();
      await obtenerEstadisticas();
      return response.data;
    } catch (err) {
      console.error("❌ Error en registrarDevolucion:", err);
      console.error("❌ Detalles del error:", err.response?.data);

      const errorMessage =
        err.response?.data?.message || "Error al registrar devolución";
      toast.error(errorMessage);
      throw err;
    }
  };

  // Buscar préstamos
  const buscarPrestamos = async (query) => {
    try {
      const response = await axiosInstance.get(
        `/AdminContro/prestamos/buscar?query=${query}`
      );
      setPrestamos(response.data.prestamos);
    } catch (err) {
      console.error("Error al buscar préstamos:", err);
    }
  };

  useEffect(() => {
    obtenerPrestamos();
    obtenerEstadisticas();
  }, []);

  return {
    prestamos,
    estadisticas,
    loading,
    error,
    obtenerPrestamos,
    registrarPrestamo,
    registrarDevolucion,
    buscarPrestamos,
    obtenerEstadisticas,
  };
};

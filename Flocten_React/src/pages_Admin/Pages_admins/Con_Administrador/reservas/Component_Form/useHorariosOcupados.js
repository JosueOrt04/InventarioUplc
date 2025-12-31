// useHorariosOcupados.js
import { useState, useEffect } from "react";
import { fetchHorariosOcupados } from "./reservasService";

export const useHorariosOcupados = (laboratorio, fecha) => {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHorarios = async () => {
      if (!laboratorio || !fecha) {
        setHorarios([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchHorariosOcupados(laboratorio, fecha);
        setHorarios(data);
      } catch (err) {
        setError(err.message);
        setHorarios([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce para evitar muchas llamadas
    const timeoutId = setTimeout(loadHorarios, 300);
    
    return () => clearTimeout(timeoutId);
  }, [laboratorio, fecha]);

  return { horarios, isLoading, error };
};
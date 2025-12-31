import { useState } from "react";
import { axiosInstance } from "../../../../../../lib/axios.js";
import { toast } from "react-hot-toast";

export const useToolSearch = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [buscando, setBuscando] = useState(false);

  const buscarHerramientas = async () => {
    if (!terminoBusqueda.trim()) {
      toast.error("Ingresa un término de búsqueda");
      return;
    }

    setBuscando(true);
    setMostrarResultados(true);

    try {
      const response = await axiosInstance.get(
        `/AdminContro/herramientas/buscar?q=${encodeURIComponent(
          terminoBusqueda
        )}`
      );

      if (response.data.success) {
        setResultadosBusqueda(response.data.data);
        if (response.data.data.length === 0) {
          toast.warning("No se encontraron herramientas");
        }
      }
    } catch (error) {
      console.error("Error al buscar:", error);
      toast.error("Error al buscar herramientas");
      setResultadosBusqueda([]);
    } finally {
      setBuscando(false);
    }
  };

  const limpiarBusqueda = () => {
    setResultadosBusqueda([]);
    setMostrarResultados(false);
    setTerminoBusqueda("");
  };

  return {
    terminoBusqueda,
    setTerminoBusqueda,
    resultadosBusqueda,
    mostrarResultados,
    buscando,
    buscarHerramientas,
    limpiarBusqueda,
  };
};

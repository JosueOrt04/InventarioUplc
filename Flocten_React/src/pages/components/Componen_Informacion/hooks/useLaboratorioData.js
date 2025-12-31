import { useState, useEffect } from "react";
import { axiosInstance } from "../../../../lib/axios.js";
import { useAuthStore } from "../../../../store/useAuthStore";

export const useLaboratorioData = () => {
  const [reactivos, setReactivos] = useState([]);
  const [herramientas, setHerramientas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthStore();

  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    reactivos: [],
    herramientas: [],
    usuarios: []
  });
  const [isSearching, setIsSearching] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (authUser?.sessionExpired) {
          setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: authUser?.token ? `Bearer ${authUser.token}` : "",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        };

        const [reactivosRes, usuariosRes, herramientasRes] = await Promise.all([
          axiosInstance.get("/list/reactivos", { headers, timeout: 15000 }),
          axiosInstance.get("/list/usuarios", { headers, timeout: 15000 }),
          axiosInstance.get("/list/Registro_Herramienta", { headers, timeout: 15000 }),
        ]);

        // Establecer datos
        const reactivosData = reactivosRes.data || [];
        const herramientasData = herramientasRes.data || [];
        const usuariosData = usuariosRes.data || [];

        setReactivos(reactivosData);
        setHerramientas(herramientasData);
        setUsuarios(usuariosData);
        
        // Inicializar resultados de búsqueda con todos los datos
        setSearchResults({
          reactivos: reactivosData,
          herramientas: herramientasData,
          usuarios: usuariosData
        });

      } catch (err) {
        console.error("Error cargando datos:", err);
        handleFetchError(err);
      } finally {
        setLoading(false);
      }
    };

    if (authUser && !authUser.sessionExpired) {
      fetchData();
    } else {
      setLoading(false);
      setError("No autenticado o sesión expirada");
    }
  }, [authUser]);

  // Manejo centralizado de errores
  const handleFetchError = (err) => {
    if (err.response?.status === 401) {
      setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    } else if (err.code === "ECONNABORTED") {
      setError("Timeout: El servidor tardó demasiado en responder");
    } else if (err.response) {
      setError(`Error del servidor: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      setError("No se pudo conectar con el servidor. Verifica tu conexión.");
    } else {
      setError(`Error: ${err.message}`);
    }
  };

  // Función optimizada para búsqueda local
  const searchItems = (term) => {
    const searchTerm = term.trim();
    
    if (!searchTerm) {
      // Si no hay término, mostrar todos los elementos
      setSearchResults({
        reactivos: reactivos,
        herramientas: herramientas,
        usuarios: usuarios
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Usar setTimeout para no bloquear la UI en búsquedas largas
    setTimeout(() => {
      const termLower = searchTerm.toLowerCase();

      const filteredReactivos = reactivos.filter(reactivo =>
        reactivo.codigo?.toLowerCase().includes(termLower) ||
        reactivo.nombre?.toLowerCase().includes(termLower) ||
        reactivo.descripcion?.toLowerCase().includes(termLower) ||
        reactivo.marca?.toLowerCase().includes(termLower) ||
        reactivo.categoria?.toLowerCase().includes(termLower)
      );

      const filteredHerramientas = herramientas.filter(herramienta =>
        herramienta.codigo?.toLowerCase().includes(termLower) ||
        herramienta.nombre?.toLowerCase().includes(termLower) ||
        herramienta.descripcion?.toLowerCase().includes(termLower) ||
        herramienta.marca?.toLowerCase().includes(termLower) ||
        herramienta.categoria?.toLowerCase().includes(termLower)
      );

      const filteredUsuarios = usuarios.filter(user =>
      
        user.fullName?.toLowerCase().includes(termLower) ||
        user.role?.toLowerCase().includes(termLower) ||
        user.email?.toLowerCase().includes(termLower)
      );

      setSearchResults({
        reactivos: filteredReactivos,
        herramientas: filteredHerramientas,
        usuarios: filteredUsuarios
      });

      setIsSearching(false);
    }, 50); // Pequeño delay para mejor experiencia de usuario
  };

  // Función para resetear la búsqueda
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults({
      reactivos: reactivos,
      herramientas: herramientas,
      usuarios: usuarios
    });
  };

  // Función para recargar datos
  const refetchData = () => {
    setLoading(true);
    setError(null);
    
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: authUser?.token ? `Bearer ${authUser.token}` : "",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        };

        const [reactivosRes, usuariosRes, herramientasRes] = await Promise.all([
          axiosInstance.get("/list/reactivos", { headers, timeout: 15000 }),
          axiosInstance.get("/list/usuarios", { headers, timeout: 15000 }),
          axiosInstance.get("/list/Registro_Herramienta", { headers, timeout: 15000 }),
        ]);

        const reactivosData = reactivosRes.data || [];
        const herramientasData = herramientasRes.data || [];
        const usuariosData = usuariosRes.data || [];

        setReactivos(reactivosData);
        setHerramientas(herramientasData);
        setUsuarios(usuariosData);
        
        setSearchResults({
          reactivos: reactivosData,
          herramientas: herramientasData,
          usuarios: usuariosData
        });

      } catch (err) {
        handleFetchError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return {
    // Datos completos
    reactivos,
    herramientas,
    usuarios,
    loading,
    error,
    
    // Funcionalidades de búsqueda
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    searchItems,
    clearSearch,
    
    // Utilidades adicionales
    refetchData
  };
};
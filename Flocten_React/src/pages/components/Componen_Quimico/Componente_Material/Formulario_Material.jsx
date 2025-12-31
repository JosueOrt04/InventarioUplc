import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../../../lib/axios.js";
import { useAuthStore } from "../../../../store/useAuthStore.js";
import Header_Ractivos from "../Header_Ractivos";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Variantes de animación
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Formulario_Material = () => {
  const { authUser, hasPermission } = useAuthStore();
  const navigate = useNavigate();

  // Estados del formulario
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estado de upload de imágenes
  const [uploadingImages, setUploadingImages] = useState({
    imagenHerramienta: false,
    imagenAdicional: false,
  });

  // Datos del formulario
  const [formData, setFormData] = useState({
    _id: "",
    codigo: "",
    nombre: "",
    tipo: "",
    cantidad: 0,
    numeroLote: "",
    numeroSerie: "",
    descripcion: "",
    estado: "Disponible",
    imagenHerramienta: "",
    imagenAdicional: "",
    createdAt: "",
  });

  // Verificar permisos
  if (!hasPermission("modificacion")) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-md w-full bg-base-100 shadow-2xl rounded-2xl p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-error/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H8m8-8V7a2 2 0 00-2-2H8a2 2 0 00-2 2v2m4 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-error mb-2">
            Acceso Denegado
          </h1>
          <p className="text-base-content/70 mb-6">
            No tienes permisos para modificar herramientas.
          </p>
          <Link to="/home" className="btn btn-primary w-full">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Regresar al Inicio
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  // Función para buscar herramientas
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

  // Función para cargar herramienta por ID
  const cargarHerramientaPorId = async (id) => {
    setCargandoDatos(true);
    try {
      const response = await axiosInstance.get(
        `/AdminContro/herramientas/${id}`
      );

      if (response.data.success) {
        const herramienta = response.data.data;
        setFormData({
          _id: herramienta._id,
          codigo: herramienta.codigo || "",
          nombre: herramienta.nombre || "",
          tipo: herramienta.tipo || "",
          cantidad: herramienta.cantidad || 0,
          numeroLote: herramienta.numeroLote || "",
          numeroSerie: herramienta.numeroSerie || "",
          descripcion: herramienta.descripcion || "",
          estado: herramienta.estado || "Disponible",
          imagenHerramienta: herramienta.imagenHerramienta || "",
          imagenAdicional: herramienta.imagenAdicional || "",
          createdAt: herramienta.createdAt || "",
        });
        toast.success("Herramienta cargada para modificación");
      }
    } catch (error) {
      console.error("Error al cargar herramienta:", error);
      toast.error("Error al cargar los datos de la herramienta");
    } finally {
      setCargandoDatos(false);
    }
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función de upload de imágenes
  const subirImagen = async (file, fieldName) => {
    if (!file) return;

    const formDataToUpload = new FormData();
    formDataToUpload.append("image", file);

    try {
      setUploadProgress(0);
      setUploadingImages((prev) => ({ ...prev, [fieldName]: true }));

      const response = await axiosInstance.post("/upload", formDataToUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authUser?.token}`,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      if (response.data.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: response.data.imageUrl,
        }));
        toast.success("Imagen subida correctamente");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast.error(
        `Error al subir la imagen: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setUploadingImages((prev) => ({ ...prev, [fieldName]: false }));
      setUploadProgress(0);
    }
  };

  // Función para manejar cambio de archivos
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      subirImagen(file, fieldName);
    }
  };

  // Función para eliminar herramienta
  const eliminarHerramienta = async () => {
    if (!formData._id) {
      toast.error("No hay herramienta seleccionada para eliminar");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.delete(
        `/AdminContro/herramientas/${formData._id}`
      );

      if (response.data.success) {
        toast.success("Herramienta eliminada correctamente");
        limpiarSeleccion();
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error(
        error.response?.data?.message || "Error al eliminar la herramienta"
      );
    } finally {
      setLoading(false);
    }
  };

  // Limpiar selección
  const limpiarSeleccion = () => {
    setFormData({
      _id: "",
      codigo: "",
      nombre: "",
      tipo: "",
      cantidad: 0,
      numeroLote: "",
      numeroSerie: "",
      descripcion: "",
      estado: "Disponible",
      imagenHerramienta: "",
      imagenAdicional: "",
      createdAt: "",
    });
    setResultadosBusqueda([]);
    setMostrarResultados(false);
    setTerminoBusqueda("");
  };

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData._id) {
      toast.error("Primero selecciona una herramienta");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        nombre: formData.nombre,
        tipo: formData.tipo,
        cantidad: formData.cantidad,
        numeroLote: formData.numeroLote,
        numeroSerie: formData.numeroSerie,
        descripcion: formData.descripcion,
        estado: formData.estado,
        imagenHerramienta: formData.imagenHerramienta,
        imagenAdicional: formData.imagenAdicional,
      };

      const response = await axiosInstance.put(
        `/AdminContro/herramientas/${formData._id}`,
        updateData
      );

      if (response.data.success) {
        toast.success("Herramienta actualizada correctamente");
        limpiarSeleccion();
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(error.response?.data?.message || "Error al guardar cambios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header_Ractivos />

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gestión de Herramientas
          </h1>
          <p className="text-base-content/70 mt-2">
            Modifica o elimina herramientas del inventario
          </p>
        </motion.div>

        {/* Sección de Búsqueda */}
        <motion.div
          className="card bg-base-100 shadow-2xl mb-6 border border-base-300"
          variants={cardVariants}
        >
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.div>
              Buscar Herramienta para Modificar
            </h3>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar por código o nombre..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && buscarHerramientas()}
                  className="input input-bordered w-full pr-12"
                  disabled={buscando}
                />
                {buscando && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                  </div>
                )}
              </div>
              <motion.button
                onClick={buscarHerramientas}
                disabled={buscando || !terminoBusqueda.trim()}
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {buscando ? (
                    <motion.span
                      key="spinner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="loading loading-spinner loading-sm"></span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
                Buscar
              </motion.button>
            </div>

            {/* Resultados de búsqueda */}
            <AnimatePresence>
              {mostrarResultados && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {resultadosBusqueda.length > 0 ? (
                    <motion.div
                      className="space-y-2 max-h-64 overflow-y-auto pr-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.05 }}
                    >
                      <motion.p
                        className="text-sm text-base-content/70 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Se encontraron {resultadosBusqueda.length} resultado(s)
                      </motion.p>
                      <AnimatePresence>
                        {resultadosBusqueda.map((herramienta, index) => (
                          <motion.div
                            key={herramienta._id}
                            variants={itemVariants}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            layout
                            onClick={() =>
                              cargarHerramientaPorId(herramienta._id)
                            }
                            className="cursor-pointer p-4 rounded-xl border border-base-300 hover:border-primary hover:bg-base-200 transition-all duration-300 hover:shadow-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-lg">
                                  {herramienta.nombre}
                                </p>
                                <div className="flex gap-4 text-sm text-base-content/70 mt-1">
                                  <span className="flex items-center gap-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                      />
                                    </svg>
                                    {herramienta.codigo}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                      />
                                    </svg>
                                    {herramienta.tipo}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                      />
                                    </svg>
                                    Cantidad: {herramienta.cantidad}
                                  </span>
                                </div>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1, x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <svg
                                  className="h-6 w-6 text-primary"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="alert alert-warning"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <svg
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>
                        No se encontraron herramientas con ese término
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Herramienta seleccionada */}
            <AnimatePresence>
              {formData._id && (
                <motion.div
                  className="mt-4 p-4 bg-success/10 border border-success/30 rounded-xl"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-success font-semibold">
                          Herramienta seleccionada:
                        </p>
                        <p className="text-sm font-medium">
                          {formData.nombre}{" "}
                          <span className="text-base-content/60">
                            (Código: {formData.codigo})
                          </span>
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={limpiarSeleccion}
                      className="btn btn-sm btn-ghost text-error"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cambiar
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {cargandoDatos && (
              <motion.div
                className="mt-4 flex items-center gap-3 text-base-content/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="loading loading-spinner loading-md text-primary"></span>
                <span>Cargando datos de la herramienta...</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Formulario de modificación */}
        <AnimatePresence>
          {formData._id && (
            <motion.div
              className="card bg-base-100 shadow-2xl border border-base-300"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              layout
            >
              <div className="card-body">
                <motion.h2
                  className="card-title text-3xl mb-6 flex items-center gap-3 pb-4 border-b border-base-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  Modificar Herramienta
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información no editable */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-base-200 rounded-xl border border-base-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Código</span>
                        <span className="badge badge-warning">No editable</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full bg-base-300 text-base-content/70 cursor-not-allowed"
                        value={formData.codigo}
                        disabled
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Fecha de Registro
                        </span>
                        <span className="badge badge-warning">No editable</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full bg-base-300 text-base-content/70 cursor-not-allowed"
                        value={new Date(
                          formData.createdAt
                        ).toLocaleDateString()}
                        disabled
                      />
                    </div>
                  </motion.div>

                  {/* Información básica */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      Datos Básicos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Nombre del Producto
                          </span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="input input-bordered focus:input-primary"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Tipo de Producto
                          </span>
                        </label>
                        <input
                          type="text"
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleChange}
                          className="input input-bordered focus:input-primary"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Imágenes */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      Imágenes
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Imagen Principal */}
                      <motion.div
                        className="form-control"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <label className="label">
                          <span className="label-text font-medium">
                            Imagen Principal
                          </span>
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {formData.imagenHerramienta ? (
                            <motion.img
                              src={formData.imagenHerramienta}
                              alt="Herramienta"
                              className="w-28 h-28 object-cover rounded-xl border-2 border-base-300 shadow-md"
                              whileHover={{ scale: 1.05, rotate: 2 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                          ) : (
                            <div className="w-28 h-28 bg-base-200 rounded-xl border-2 border-dashed border-base-300 flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-base-content/40"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 w-full">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, "imagenHerramienta")
                              }
                              className="file-input file-input-bordered file-input-primary file-input-sm w-full"
                            />
                            {uploadingImages.imagenHerramienta && (
                              <motion.div
                                className="mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <progress
                                  className="progress progress-primary w-full"
                                  value={uploadProgress}
                                  max="100"
                                ></progress>
                                <p className="text-xs text-center mt-1 text-base-content/70">
                                  Subiendo... {uploadProgress}%
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      {/* Imagen Adicional */}
                      <motion.div
                        className="form-control"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <label className="label">
                          <span className="label-text font-medium">
                            Imagen Adicional
                          </span>
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {formData.imagenAdicional ? (
                            <motion.img
                              src={formData.imagenAdicional}
                              alt="Adicional"
                              className="w-28 h-28 object-cover rounded-xl border-2 border-base-300 shadow-md"
                              whileHover={{ scale: 1.05, rotate: -2 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                          ) : (
                            <div className="w-28 h-28 bg-base-200 rounded-xl border-2 border-dashed border-base-300 flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-base-content/40"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 w-full">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, "imagenAdicional")
                              }
                              className="file-input file-input-bordered file-input-primary file-input-sm w-full"
                            />
                            {uploadingImages.imagenAdicional && (
                              <motion.div
                                className="mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <progress
                                  className="progress progress-primary w-full"
                                  value={uploadProgress}
                                  max="100"
                                ></progress>
                                <p className="text-xs text-center mt-1 text-base-content/70">
                                  Subiendo... {uploadProgress}%
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Detalles del Producto */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      Detalles del Producto
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Cantidad
                          </span>
                        </label>
                        <input
                          type="number"
                          name="cantidad"
                          value={formData.cantidad}
                          onChange={handleChange}
                          className="input input-bordered focus:input-primary"
                          min="0"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Estado</span>
                        </label>
                        <select
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                          className="select select-bordered focus:select-primary"
                          required
                        >
                          <option value="Disponible">Disponible</option>
                          <option value="En Uso">En Uso</option>
                          <option value="Mantenimiento">Mantenimiento</option>
                          <option value="Dañado">Dañado</option>
                          <option value="Perdido">Perdido</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Número de Lote
                          </span>
                          <span className="label-text-alt">Opcional</span>
                        </label>
                        <input
                          type="text"
                          name="numeroLote"
                          value={formData.numeroLote}
                          onChange={handleChange}
                          className="input input-bordered focus:input-primary"
                          placeholder="Ingresa el lote"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Número de Serie
                          </span>
                          <span className="label-text-alt">Opcional</span>
                        </label>
                        <input
                          type="text"
                          name="numeroSerie"
                          value={formData.numeroSerie}
                          onChange={handleChange}
                          className="input input-bordered focus:input-primary"
                          placeholder="Ingresa la serie"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Descripción
                        </span>
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="textarea textarea-bordered focus:textarea-primary h-32"
                        placeholder="Descripción detallada del producto..."
                      />
                    </div>
                  </motion.div>

                  {/* Botones */}
                  <motion.div
                    className="flex justify-between gap-4 pt-6 border-t border-base-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {/* Botón Eliminar */}
                    {hasPermission("eliminacion") && (
                      <motion.button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="btn btn-error gap-2"
                        disabled={loading}
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Eliminar
                      </motion.button>
                    )}

                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={limpiarSeleccion}
                        className="btn btn-ghost"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        Cancelar
                      </motion.button>

                      <motion.button
                        type="submit"
                        className="btn btn-primary gap-2"
                        disabled={loading}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <span className="loading loading-spinner loading-sm"></span>
                              Guardando...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="save"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Guardar Cambios
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Confirmación para Eliminar */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="modal modal-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-box relative overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-error to-warning"></div>
              <motion.h3
                className="font-bold text-2xl text-error mb-4 flex items-center gap-3 pt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-error"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                Confirmar Eliminación
              </motion.h3>
              <motion.p
                className="py-4 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ¿Estás seguro de que deseas eliminar la herramienta{" "}
                <strong className="text-error">{formData.nombre}</strong> con
                código <strong className="text-error">{formData.codigo}</strong>
                ?
              </motion.p>
              <motion.div
                className="alert alert-error mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="font-medium">
                  Esta acción no se puede deshacer.
                </span>
              </motion.div>
              <motion.div
                className="modal-action gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <motion.button
                  className="btn btn-error gap-2"
                  onClick={eliminarHerramienta}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="deleting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="loading loading-spinner loading-sm"></span>
                        Eliminando...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="confirm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Sí, Eliminar
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Formulario_Material;

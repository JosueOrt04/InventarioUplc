import { useState } from "react";
import axios from "axios";
import { INITIAL_FORM_DATA } from "../constants/constants";

const useLabForm = (authUser, codigo, itemType, reactivoImg, simboloImg) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación especial para el campo "cantidad"
    if (name === "cantidad") {
      // Solo permite números enteros (incluyendo campo vacío para poder borrar)
      if (value === "" || /^\d+$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Para los demás campos, comportamiento normal
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ... el resto del código permanece igual
  const togglePictogram = (pictogramId) => {
    setFormData((prev) => ({
      ...prev,
      pictogramasPeligro: prev.pictogramasPeligro.includes(pictogramId)
        ? prev.pictogramasPeligro.filter((id) => id !== pictogramId)
        : [...prev.pictogramasPeligro, pictogramId],
    }));
  };

  const toggleHazardPhrase = (phraseCode) => {
    setFormData((prev) => ({
      ...prev,
      frasesPeligro: prev.frasesPeligro.includes(phraseCode)
        ? prev.frasesPeligro.filter((code) => code !== phraseCode)
        : [...prev.frasesPeligro, phraseCode],
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

 

    // Validación de autenticación
    if (!authUser) {
      setErrors({ general: "Error: Usuario no autenticado" });
      setIsSubmitting(false);
      return false;
    }

    if (!authUser.controlNumber) {
      setErrors({ general: "No se pudo obtener el número de control" });
      setIsSubmitting(false);
      return false;
    }

    if (!authUser.fullName) {
      setErrors({ general: "No se pudo obtener el nombre del usuario" });
      setIsSubmitting(false);
      return false;
    }

    // Lógica de validación del formulario
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";

    // Validación específica para cantidad (opcional - si quieres que sea requerido)
    if (!formData.cantidad) newErrors.cantidad = "La cantidad es requerida";
    else if (!/^\d+$/.test(formData.cantidad)) {
      newErrors.cantidad = "La cantidad debe ser un número entero";
    }

    // Validaciones específicas por tipo
    if (itemType === "reactivo") {
      if (!formData.formula) newErrors.formula = "Fórmula es requerida";
      if (!formData.primerosAuxilios)
        newErrors.primerosAuxilios = "Primeros auxilios es requerido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return false;
    }

    try {
      let dataToSend;
      let endpoint = "";

      const baseData = {
        controlNumber: authUser.controlNumber,
        fullName: authUser.fullName,
        codigo: codigo,
        nombre: formData.nombre,
        cantidad: formData.cantidad || "No especificado",
        numeroLote: formData.numeroLote || "No especificado",
        descripcion: formData.descripcion || "No especificado",
      };

      if (itemType === "reactivo") {
        endpoint = "/api/reactivos";
        dataToSend = {
          ...baseData,
          imagenReactivo: reactivoImg,
          imagenSimbolo: simboloImg,
          formula: formData.formula,
          concentracion: formData.concentracion || "No especificado",
          primerosAuxilios: formData.primerosAuxilios,
          manejoSeguro: formData.manejoSeguro,
          pictogramasPeligro: formData.pictogramasPeligro,
          frasesPeligro: formData.frasesPeligro,
        };
      } else if (itemType === "herramienta") {
        endpoint = "/api/herramientas";
        dataToSend = {
          ...baseData,
          imagenHerramienta: reactivoImg,
          imagenAdicional: simboloImg,
          estado: formData.estado,
          numeroSerie: formData.numeroSerie || "No especificado",
          tipo:
            formData.tipoHerramienta === "otros"
              ? formData.especificarTipo
              : formData.tipoHerramienta,
        };
      } else {
        setIsSubmitting(false);
        return false;
      }

    

      // SOLUCIÓN PRINCIPAL: Eliminar Authorization header y usar withCredentials
      const response = await axios.post(
        `http://localhost:5001${endpoint}`,

        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            // NO incluir Authorization header - el token va en cookies automáticamente
          },
          withCredentials: true, // ← ESTO ES CLAVE para enviar cookies
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 0;
            const progress =
              total > 0 ? Math.round((progressEvent.loaded * 100) / total) : 0;
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.success) {
        alert(`✅ ${itemType} registrado correctamente`);
        resetForm();
        return true;
      } else {
        throw new Error(
          response.data.message || "Error desconocido del servidor"
        );
      }
    } catch (error) {
      console.error(`❌ Error al registrar ${itemType}:`, error);

      // Mensaje de error más específico
      let errorMessage = error.message;
      if (error.response?.status === 401) {
        errorMessage =
          "Error de autenticación. Por favor, inicia sesión nuevamente.";
      } else if (error.response?.status === 403) {
        errorMessage = "No tienes permisos para realizar esta acción.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      alert(`❌ Error al registrar ${itemType}: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
    return false;
  };

  return {
    formData,
    errors,
    isSubmitting,
    uploadProgress,
    handleChange,
    togglePictogram,
    toggleHazardPhrase,
    handleSubmit,
    resetForm,
  };
};

export default useLabForm;

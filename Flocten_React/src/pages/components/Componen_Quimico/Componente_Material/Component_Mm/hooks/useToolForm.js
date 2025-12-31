import { useState } from "react";
import { axiosInstance } from "../../../../../../lib/axios.js";
import { toast } from "react-hot-toast";

export const useToolForm = () => {
  const [loading, setLoading] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [uploadingImages, setUploadingImages] = useState({
    imagenHerramienta: false,
    imagenAdicional: false,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        return true;
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(error.response?.data?.message || "Error al guardar cambios");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
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
  };

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  return {
    formData,
    loading,
    cargandoDatos,
    uploadingImages,
    setUploadingImages,
    handleChange,
    handleSubmit,
    cargarHerramientaPorId,
    limpiarFormulario,
    updateFormData,
  };
};

// hooks/useDevolucionData.js
import { useState } from "react";

export const useDevolucionData = (prestamo) => {
  const [formData, setFormData] = useState({
    cantidadDevuelta:
      prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0),
    observaciones: prestamo.observaciones || "",
    imagenesDevolucion: [], // ✅ INICIALIZA COMO ARRAY VACÍO
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      cantidadDevuelta:
        prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0),
      observaciones: prestamo.observaciones || "",
      imagenesDevolucion: [],
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};

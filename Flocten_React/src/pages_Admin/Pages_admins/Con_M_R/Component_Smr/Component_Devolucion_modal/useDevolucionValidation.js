import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDevolucionValidation = (prestamo, formData) => {
  const calcularEstado = () => {
    const cantidadFaltante = prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);
    const cantidadDespuesDevolucion = cantidadFaltante - formData.cantidadDevuelta;

    if (cantidadDespuesDevolucion === 0) {
      return { tipo: "completa", mensaje: "Devolución completa" };
    } else if (cantidadDespuesDevolucion > 0) {
      return {
        tipo: "parcial",
        mensaje: `Quedarán ${cantidadDespuesDevolucion} unidades pendientes`,
      };
    }

    return {
      tipo: "excedente",
      mensaje: "No puede devolver más de lo prestado",
    };
  };

  const estado = useMemo(() => calcularEstado(), [prestamo, formData.cantidadDevuelta]);

  const validateForm = () => {
    const cantidadMaxima = prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);

    if (!formData.cantidadDevuelta || formData.cantidadDevuelta <= 0) {
      toast.error("La cantidad devuelta debe ser mayor a 0");
      return false;
    }

    if (formData.cantidadDevuelta > cantidadMaxima) {
      toast.error(`No puede devolver más de ${cantidadMaxima} unidades`);
      return false;
    }

    return true;
  };

  const getResumenDevolucion = () => {
    const pendienteInicial = prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);
    const pendienteDespues = pendienteInicial - formData.cantidadDevuelta;

    return {
      cantidadPrestada: prestamo.cantidadPrestada,
      yaDevuelto: prestamo.cantidadDevuelta || 0,
      pendienteInicial,
      estaDevolucion: formData.cantidadDevuelta,
      pendienteDespues,
      imagenesCount: formData.imagenesDevolucion.length,
    };
  };

  return {
    estado,
    validateForm,
    getResumenDevolucion,
  };
};
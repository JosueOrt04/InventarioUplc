import { useMemo } from 'react';

export const useLoanCalculations = (prestamo) => {
  return useMemo(() => {
    if (!prestamo) return {};

    const fechaPrestamo = new Date(prestamo.fecha_prestamo);
    const fechaDevolucion = prestamo.fecha_devolucion
      ? new Date(prestamo.fecha_devolucion)
      : null;
    const hoy = new Date();
    const diasTranscurridos = Math.floor(
      (hoy - fechaPrestamo) / (1000 * 60 * 60 * 24)
    );
    const estaAtrasado =
      !prestamo.devuelto && diasTranscurridos > prestamo.diasPrestamo;

    return {
      fechaPrestamo,
      fechaDevolucion,
      diasTranscurridos,
      estaAtrasado
    };
  }, [prestamo]);
};
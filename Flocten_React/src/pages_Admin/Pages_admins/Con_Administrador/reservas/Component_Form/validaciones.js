/**
 * Verifica si un horario se solapa con los horarios ocupados
 */
export const esHorarioOcupado = (horaInicio, horaFin, horariosOcupados = []) => {
  if (!horaInicio || !horaFin) return false;
  
  return horariosOcupados.some((h) => {
    return (
      (horaInicio >= h.horaInicio && horaInicio < h.horaFin) ||
      (horaFin > h.horaInicio && horaFin <= h.horaFin) ||
      (horaInicio <= h.horaInicio && horaFin >= h.horaFin)
    );
  });
};


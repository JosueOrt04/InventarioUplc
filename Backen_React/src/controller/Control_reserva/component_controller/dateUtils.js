// utils/dateUtils.js
export const ajustarFechaTimezone = (fechaString) => {
  const fecha = new Date(fechaString);
  // Ajustar al timezone local para mantener el día correcto
  return new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000));
};

export const formatearFechaParaBD = (fechaString) => {
  return ajustarFechaTimezone(fechaString).toISOString().split('T')[0];
};
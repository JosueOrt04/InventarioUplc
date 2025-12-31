import { API_URL } from "./constants";



/**
 * Obtiene horarios ocupados para un laboratorio y fecha
 */
export const fetchHorariosOcupados = async (laboratorio, fecha) => {
  try {
    const response = await fetch(
      `${API_URL}/horarios-ocupados?laboratorio=${laboratorio}&fecha=${fecha}`
    );

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const texto = await response.text();
      throw new Error(`Respuesta inesperada: ${texto}`);
    }

    const data = await response.json();
    return data.horarios || [];
  } catch (error) {
    console.error("Error al verificar horarios:", error);
    throw error;
  }
};

/**
 * Prepara el FormData para enviar la reserva
 */
export const prepararFormData = (data, authUser) => {
  const formData = new FormData();
  

  // Datos principales
  formData.append("laboratorio", data.laboratorio);
  formData.append("fechaReserva", data.fechaReserva);
  formData.append("horaInicio", data.horaInicio);
  formData.append("horaFin", data.horaFin);
  formData.append("materia", data.materia);
  formData.append("numeroAlumnos", data.numeroAlumnos);
  formData.append("observacionRecepcion", data.observacionRecepcion);

  // Imagen
  if (data.imagenRecepcion?.[0]) {
    formData.append("imagenRecepcion", data.imagenRecepcion[0]);
  }

  // Datos del asesor
  if (authUser) {
    formData.append("asesorId", authUser._id);
    formData.append("controlNumberAsesor", authUser.controlNumber);
    formData.append("nombreAsesor", authUser.fullName);
  }

  return formData;
};

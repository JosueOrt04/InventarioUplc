import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCrearReserva, useActualizarReserva } from "../useReservas";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { toast } from "react-hot-toast";
import { prepararFormData } from "./reservasService";
import { esHorarioOcupado } from "./validaciones";

export const useReservaForm = (reserva = null, onClose) => {
  const isEdit = !!reserva;
  const crearMutation = useCrearReserva();
  const actualizarMutation = useActualizarReserva();
  const { authUser } = useAuthStore();

  // En tu archivo useReservaForm.js, actualiza estas funciones:

  // Función corregida para obtener la fecha mínima (hoy)

  const getMinDate = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000; // diferencia en ms
    const localDate = new Date(date - offset);
    return localDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
  };

  const getMinTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };
  const form = useForm({
    defaultValues: reserva || {
      controlNumber: "",
      Nombre_Maestro: "",
      laboratorio: "",
      fechaReserva: getMinDate(), // Fecha por defecto hoy
      horaInicio: "",
      horaFin: "",
      materia: "",
      numeroAlumnos: 0,
      observacionRecepcion: "",
    },
  });

  // Observar cambios en fecha para actualizar hora mínima
  const watchFecha = form.watch("fechaReserva");

  useEffect(() => {
    if (watchFecha === getMinDate()) {
      // Si la fecha seleccionada es hoy, actualizar hora mínima
      const minTime = getMinTime(watchFecha);
      const currentHoraInicio = form.getValues("horaInicio");

      if (!currentHoraInicio || currentHoraInicio < minTime) {
        form.setValue("horaInicio", minTime);
      }
    }
  }, [watchFecha, form]);

  // Validación personalizada para horas
  const validateTimeRange = (data, horariosOcupados = []) => {
    const { horaInicio, horaFin, fechaReserva } = data;

    if (!horaInicio || !horaFin) return true;

    // Si es hoy, verificar que la hora no sea anterior a la actual
    if (fechaReserva === getMinDate()) {
      const minTime = getMinTime(fechaReserva);
      if (horaInicio < minTime) {
        return "La hora de inicio no puede ser anterior a la hora actual";
      }
    }

    // Verificar que horaFin sea mayor que horaInicio
    if (horaFin <= horaInicio) {
      return "La hora de fin debe ser posterior a la hora de inicio";
    }

    // Verificar que la diferencia mínima sea de 30 minutos
    const [startHour, startMinute] = horaInicio.split(":").map(Number);
    const [endHour, endMinute] = horaFin.split(":").map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    if (endTotal - startTotal < 30) {
      return "La reserva debe tener una duración mínima de 30 minutos";
    }

    // Verificar si se solapa con horarios ocupados
    if (esHorarioOcupado(horaInicio, horaFin, horariosOcupados)) {
      return "El horario seleccionado se solapa con una reserva existente";
    }

    return true;
  };

  // Autorellenar datos del usuario
  useEffect(() => {
    if (authUser) {
      form.setValue("controlNumber", authUser.controlNumber || "");
      form.setValue("Nombre_Maestro", authUser.fullName || "");
    }
  }, [authUser, form]);

  // En la función onSubmit de useReservaForm:
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // Validación adicional antes de enviar
      const timeValidation = validateTimeRange(data, []);
      if (timeValidation !== true) {
        toast.error(`⛔ ${timeValidation}`); // Solo toast aquí para errores de submit
        return;
      }

      const formData = prepararFormData(data, authUser);

      const mutationOptions = {
        onError: (error) => {
          if (error.response?.status === 409) {
            const mensaje =
              error.response?.data?.error || "Horario no disponible";
            const detalles = error.response?.data?.conflicto;

            toast.custom(
              (t) => (
                <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg shadow-lg max-w-md">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">⚠️</span>
                    <div className="flex-1">
                      <strong className="block">Horario no disponible</strong>
                      {detalles && (
                        <span className="text-sm">
                          Ya existe una reserva de{" "}
                          <strong>{detalles.horaInicio}</strong> a{" "}
                          <strong>{detalles.horaFin}</strong>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 6000,
                position: "top-center",
              }
            );
          } else {
            toast.error("Error al guardar la reserva");
          }
        },
        onSuccess: () => {
          toast.success(isEdit ? "Reserva actualizada" : "Reserva creada");
          onClose();
        },
      };

      if (isEdit) {
        await actualizarMutation.mutateAsync(
          { id: reserva._id, data: formData },
          mutationOptions
        );
      } else {
        await crearMutation.mutateAsync(formData, mutationOptions);
      }
    } catch (error) {
      console.error("Error en el submit:", error);
    }
  });
  return {
    form,
    onSubmit,
    isEdit,
    authUser,
    isLoading: crearMutation.isLoading || actualizarMutation.isLoading,
    getMinDate,
    getMinTime,
    validateTimeRange,
  };
};

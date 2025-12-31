import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useReservaForm } from "./Component_Form/useReservaForm";
import { useHorariosOcupados } from "./Component_Form/useHorariosOcupados";
import { FormField } from "./Component_Form/FormField";
import { LaboratorioInfo } from "./Component_Form/LaboratorioInfo";
import { UserInfo } from "./Component_Form/UserInfo";
import { esHorarioOcupado } from "./Component_Form/validaciones";
import { LABORATORIOS_OPTIONS } from "./Component_Form/constants";
import toast from "react-hot-toast";


export const ReservaForm = ({ reserva = null, onClose }) => {
  const {
    form,
    onSubmit,
    isEdit,
    authUser,
    isLoading,
    getMinDate,
    getMinTime,
    validateTimeRange,
  } = useReservaForm(reserva, onClose);

  const watchLaboratorio = form.watch("laboratorio") || "";
  const watchFecha       = form.watch("fechaReserva") || "";
  const watchHoraInicio  = form.watch("horaInicio") || "";
  const watchHoraFin     = form.watch("horaFin") || "";

  const cambioCritico = isEdit
    ? watchLaboratorio !== reserva?.laboratorio ||
      watchFecha !== reserva?.fechaReserva ||
      watchHoraInicio !== reserva?.horaInicio ||
      watchHoraFin !== reserva?.horaFin
    : true;

  const { horarios, isLoading: loadingHorarios } = useHorariosOcupados(
    cambioCritico ? watchLaboratorio : "", // no pedimos si no hay cambio
    cambioCritico ? watchFecha : ""
  );

  const validarHoraInicio = (value) => {
    if (!value) return true;
    if (isEdit && !cambioCritico) return true; // sin validación
    if (watchFecha === getMinDate()) {
      const minTime = getMinTime(watchFecha);
      if (value < minTime) return "La hora de inicio no puede ser anterior a la hora actual";
    }
    if (watchHoraFin && esHorarioOcupado(value, watchHoraFin, horarios))
      return "Este horario se solapa con una reserva existente";
    return true;
  };

  const validarHorarioOcupado = (value) => {
    if (!value || !watchHoraInicio) return true;
    if (isEdit && !cambioCritico) return true;
    if (value <= watchHoraInicio) return "La hora fin debe ser posterior a la hora inicio";
    if (esHorarioOcupado(watchHoraInicio, value, horarios))
      return "Este horario se solapa con una reserva existente";
    return true;
  };

useEffect(() => {
  if (!watchHoraInicio || !watchHoraFin || !horarios?.length) return;
  
  if (esHorarioOcupado(watchHoraInicio, watchHoraFin, horarios)) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-red-50 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-200`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-lg">⛔</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-800">
                  Horario ocupado detectado
                </p>
                <p className="mt-1 text-sm text-red-700">
                  {watchHoraInicio} - {watchHoraFin}
                </p>
                <p className="mt-2 text-xs text-red-600">
                  Este horario se solapa con una reserva existente. Por favor, seleccione otro rango.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-red-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: 'top-right',
      }
    );
  }
}, [watchHoraInicio, watchHoraFin, horarios]);

  useEffect(() => {
    const errors = form.formState.errors;
    if (errors.horaInicio)
      toast.error(`⛔ Hora inicio: ${errors.horaInicio.message}`);
    if (errors.horaFin) toast.error(`⛔ Hora fin: ${errors.horaFin.message}`);
    if (errors.laboratorio)
      toast.error(`⛔ Laboratorio: ${errors.laboratorio.message}`);
    if (errors.fechaReserva)
      toast.error(`⛔ Fecha: ${errors.fechaReserva.message}`);
    if (errors.numeroAlumnos)
      toast.error(`⛔ Alumnos: ${errors.numeroAlumnos.message}`);
  }, [form.formState.errors]);



  return (
    <AnimatePresence>
      <motion.div
        className="modal modal-open"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto bg-primary-content shadow-2xl rounded-2xl "
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <motion.div
            className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <h3 className="font-bold text-2xl text-gray-900">
                {isEdit ? "✏️ Editar Reserva" : "📅 Nueva Reserva"}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                Complete todos los campos requeridos para la reserva
              </p>
         
            </div>
            <motion.button
              onClick={onClose}
              className="btn btn-ghost btn-circle hover:bg-primary-content"
              disabled={isLoading}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>

          {/* Usuario */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UserInfo user={authUser} />
          </motion.div>

          {/* Horarios ocupados */}
          <motion.div
            className="mb-6 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {watchLaboratorio && watchFecha && (
              <div className="md:col-span-2 mt-4">
                <LaboratorioInfo
                  laboratorio={watchLaboratorio}
                  fecha={watchFecha}
                />
              </div>
            )}
            {loadingHorarios && (
              <div className="md:col-span-2 mt-4 p-4 bg-primary-content rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <motion.span
                    className="loading loading-spinner loading-sm"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                  Cargando horarios ocupados...
                </div>
              </div>
            )}
          </motion.div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Sección 1 */}
            <motion.div
              className="bg-primary-content p-6 rounded-xl shadow-sm border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900">
                🏫 Información de la Reserva
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="No. de Control"
                  register={form.register("controlNumber")}
                  disabled
                />
                <FormField
                  label="Nombre del Maestro"
                  register={form.register("Nombre_Maestro")}
                  disabled
                />
                <FormField
                  label="Salon *"
                  type="select"
                  register={form.register("laboratorio", {
                    required: "Campo obligatorio",
                  })}
                  options={LABORATORIOS_OPTIONS}
                  error={form.formState.errors.laboratorio}
                />
                <FormField
                  label="Fecha *"
                  type="date"
                  register={form.register("fechaReserva", {
                    required: "Campo obligatorio",
                    validate: {
                      notPast: (value) => {
                        const date = new Date();
                        const offset = date.getTimezoneOffset() * 60000;
                        const localDate = new Date(date - offset);
                        const todayStr = localDate.toISOString().slice(0, 10);
                        return (
                          value >= todayStr ||
                          "No puede seleccionar fechas anteriores"
                        );
                      },
                    },
                  })}
                  error={form.formState.errors.fechaReserva}
                  min={getMinDate()}
                />
                <FormField
                  label="Hora Inicio *"
                  type="time"
                  register={form.register("horaInicio", {
                    required: "Campo obligatorio",
                    min:
                      watchFecha === getMinDate()
                        ? getMinTime(watchFecha)
                        : "07:00",
                    validate: validarHoraInicio,
                  })}
                  error={form.formState.errors.horaInicio}
                  min={
                    watchFecha === getMinDate()
                      ? getMinTime(watchFecha)
                      : "07:00"
                  }
                />
                <FormField
                  label="Hora Fin *"
                  type="time"
                  register={form.register("horaFin", {
                    required: "Campo obligatorio",
                    min: watchHoraInicio || "07:00",
                    validate: validarHorarioOcupado,
                  })}
                  error={form.formState.errors.horaFin}
                  min={watchHoraInicio || "07:00"}
                />
                <FormField
                  label="Tipo"
                  register={form.register("materia")}
                  placeholder="Ej: Boda, Cumplaño, etc."
                />
              </div>
            </motion.div>

            {/* Sección 2 */}
            <motion.div
              className="bg-primary-content p-6 rounded-xl shadow-sm border "
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900">
                👥 Detalles Adicionales
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Número de Alumnos"
                  type="number"
                  register={form.register("numeroAlumnos", {
                    min: {
                      value: 0,
                      message: "El número no puede ser negativo",
                    },
                    max: { value: 50, message: "Máximo 50 alumnos" },
                  })}
                  error={form.formState.errors.numeroAlumnos}
                  min="0"
                  max="50"
                />
              
                <div className="md:col-span-2">
                  <FormField
                    label="Observaciones"
                    type="textarea"
                    register={form.register("observacionRecepcion")}
                    placeholder="Observaciones adicionales para la recepción..."
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text font-semibold text-gray-800">
                        📷 Imagen de Referencia (Opcional)
                      </span>
                    </div>
                    <input
                      type="file"
                      {...form.register("imagenRecepcion")}
                      accept="image/*"
                      className="file-input file-input-bordered file-input-primary w-full"
                    />
                    <div className="label">
                      <span className="label-text-alt text-gray-600">
                        Formatos aceptados: JPG, PNG, GIF (Máx. 5MB)
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Notas */}
            <motion.div
              className="bg-primary-content border border-blue-300 rounded-xl p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary-content text-blue-900 rounded-full p-2">
                  💡
                </div>
                <div className="text-sm text-blue-900">
                  <strong>Notas importantes:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Los campos marcados con * son obligatorios</li>
                    <li>No se permiten reservas en fechas pasadas</li>
                    <li>La duración mínima de reserva es de 30 minutos</li>
                    <li>Verifique los horarios ocupados antes de reservar</li>
                    <li>
                      No se permiten horarios que se solapen con reservas
                      existentes
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Acciones */}
            <motion.div
              className="modal-action flex gap-3 pt-4 bg-primary-content border-y-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="button"
                className="btn btn-outline btn-neutral flex-1"
                onClick={onClose}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                type="submit"
                className="btn btn-primary flex-1 gap-2"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Procesando...
                  </>
                ) : isEdit ? (
                  <>💾 Guardar Cambios</>
                ) : (
                  <>📋 Crear Reserva</>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

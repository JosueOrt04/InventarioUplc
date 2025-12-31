// components/Con_Administrador/reservas/DisponibilidadModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDisponibilidad } from "./useReservas";

export const DisponibilidadModal = ({ onClose }) => {
  const hoyLocal = new Date().toLocaleDateString("en-CA");
  const [laboratorio, setLaboratorio] = useState("Lab-A");
  const [fecha, setFecha] = useState(hoyLocal);

  const { data, isLoading, error, isError } = useDisponibilidad(
    laboratorio,
    fecha
  );

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
          className="modal-box max-w-4xl shadow-2xl rounded-2xl bg-base-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl text-primary">
              📅 Consultar Disponibilidad
            </h3>
            <motion.button
              className="btn btn-ghost btn-sm"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Filtros */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gradient-to-r from-base-200 to-base-300 rounded-2xl shadow-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Salones</span>
              </label>
              <select
                className="select select-bordered select-md"
                value={laboratorio}
                onChange={(e) => setLaboratorio(e.target.value)}
              >
                <option value="Sal-A">Salon A</option>
              </select>
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold fl">Fecha</span>
              </label>
              <input
                type="date"
                className="input input-bordered input-md"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={hoyLocal}
              />
            </div>
          </motion.div>

          {/* Estado de carga y error */}
          {isLoading && (
            <motion.div
              className="flex justify-center items-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <span className="ml-2 text-lg">
                Consultando disponibilidad...
              </span>
            </motion.div>
          )}

          {isError && (
            <motion.div
              className="alert alert-error mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>❌ Error: {error.message}</span>
            </motion.div>
          )}

          {/* Resultados */}
          {data && !isLoading && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Resumen */}
              <motion.div
                className="stats shadow-xl w-full bg-gradient-to-r from-base-100 to-base-200 rounded-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="stat">
                  <div className="stat-title">Total Horarios</div>
                  <div className="stat-value text-primary">
                    {(data.totalOcupados || 0) + (data.totalLibres || 0)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-success">Horarios Libres</div>
                  <div className="stat-value text-success">
                    {data.totalLibres || 0}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-error">Horarios Ocupados</div>
                  <div className="stat-value text-error">
                    {data.totalOcupados || 0}
                  </div>
                </div>
              </motion.div>

              {/* Grid de disponibilidad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Horarios Libres */}
                <motion.div
                  className="card bg-base-100 border border-success shadow-lg rounded-2xl"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h4 className="card-title text-success">
                      ✅ Horarios Libres ({data.libres?.length || 0})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {data.libres?.length > 0 ? (
                        data.libres.map((slot, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-success text-success-content p-3 rounded-lg shadow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div className="font-bold">
                              {slot.horaInicio} - {slot.horaFin}
                            </div>
                            <div className="text-sm opacity-90">
                              Duración:{" "}
                              {calcularDuracion(slot.horaInicio, slot.horaFin)}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-base-content/70">
                          No hay horarios libres
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Horarios Ocupados */}
                <motion.div
                  className="card bg-base-100 border border-error shadow-lg rounded-2xl"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h4 className="card-title text-error">
                      ❌ Horarios Ocupados ({data.ocupados?.length || 0})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {data.ocupados?.length > 0 ? (
                        data.ocupados.map((slot, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-error text-error-content p-3 rounded-lg shadow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div className="font-bold">
                              {slot.horaInicio} - {slot.horaFin}
                            </div>
                            <div className="text-sm">
                              📚 {slot.materia || "Sin materia"}
                            </div>
                            <div className="text-xs opacity-80">
                              👤 {slot.nombreAsesor} • {slot.estado}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-base-content/70">
                          No hay horarios ocupados
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="modal-action mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Función auxiliar para calcular duración
const calcularDuracion = (inicio, fin) => {
  const [h1, m1] = inicio.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  const minutos = h2 * 60 + m2 - (h1 * 60 + m1);
  return `${Math.floor(minutos / 60)}h ${minutos % 60}m`;
};

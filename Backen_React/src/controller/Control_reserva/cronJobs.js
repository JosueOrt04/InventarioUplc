import cron from "node-cron";
import ReservaLaboratorio from "../../models/reservaLaboratorio.model.js";

// Job que se ejecuta cada minuto
export const iniciarReservasAutomaticamente = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM

      // Iniciar reservas automáticamente
      const reservasParaIniciar = await ReservaLaboratorio.find({
        estado: "reservado",
        fechaReserva: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        },
        horaInicio: { $lte: currentTime },
        horaFin: { $gt: currentTime },
      });

      for (const reserva of reservasParaIniciar) {
        reserva.estado = "en_uso";
        await reserva.save();
      }

      // ✅ Marcar como "tiempo_finalizado" si ya pasó la hora de fin
      const reservasParaFinalizarTiempo = await ReservaLaboratorio.find({
        estado: "en_uso",
        fechaReserva: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        },
        horaFin: { $lt: currentTime },
      });

      for (const reserva of reservasParaFinalizarTiempo) {
        reserva.estado = "tiempo_finalizado";
        await reserva.save();
      }
    } catch (error) {
      console.error("Error en cron job:", error);
    }
  });
};
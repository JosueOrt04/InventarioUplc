import ReservaLaboratorio from "../../models/reservaLaboratorio.model.js";
import { iniciarUsoAutomatico } from "./component_controller/estados.controller.js";

class AutoUpdateService {
  constructor() {
    this.intervalId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;

  
    
    // Verificar cada minuto
    this.intervalId = setInterval(async () => {
      try {
        await this.verificarReservasPendientes();
      } catch (error) {
        console.error('Error en verificación automática:', error);
      }
    }, 10000); // 60 segundos

    // Ejecutar inmediatamente al iniciar
    this.verificarReservasPendientes();
    
    this.isRunning = true;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
   
    }
  }

  async verificarReservasPendientes() {
    try {
      const ahora = new Date();
      const horaActual = ahora.toTimeString().slice(0, 5); // Formato HH:MM
      const fechaActual = ahora.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  

      // Buscar reservas que deben iniciarse
      const reservasParaIniciar = await ReservaLaboratorio.find({
        estado: "reservado",
        fechaReserva: fechaActual,
        horaInicio: { $lte: horaActual },
        horaFin: { $gt: horaActual }
      });

    

      // Actualizar cada reserva
      for (const reserva of reservasParaIniciar) {
        try {
          reserva.estado = "en_uso";
          await reserva.save();
          
          
          // Aquí puedes agregar notificaciones si es necesario
          this.notificarCambioEstado(reserva);
          
        } catch (error) {
          console.error(`❌ Error actualizando reserva ${reserva._id}:`, error);
        }
      }

    } catch (error) {
      console.error('Error en verificación de reservas pendientes:', error);
    }
  }

  notificarCambioEstado(reserva) {
    // Aquí puedes implementar notificaciones:
    // - WebSocket para actualizar la UI en tiempo real
    // - Email al asesor
    // - Notificación push
    
  }
}

export default new AutoUpdateService();
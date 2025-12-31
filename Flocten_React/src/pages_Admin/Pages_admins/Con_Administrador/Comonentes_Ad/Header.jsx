// components/Con_Administrador/Header.jsx
import { UserInfo } from "./UserInfo";

export const Header = ({ onReporte, onDisponibilidad, onNuevaReserva }) => (
  <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4 md:p-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Gestión de Reservas Salon
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Administra tus reservas de Salon eficientemente
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-accent btn-sm md:btn-md gap-2" onClick={onReporte}>
          📊 Reporte
        </button>
        <button className="btn btn-info btn-sm md:btn-md gap-2" onClick={onDisponibilidad}>
          📅 Disponibilidad
        </button>
        <button className="btn btn-primary btn-sm md:btn-md gap-2" onClick={onNuevaReserva}>
          ➕ Nueva Reserva
        </button>
      </div>
    </div>

    <UserInfo />
  </div>
);
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarMonth from "./CalendarMonth";
import CalendarLegend from "./CalendarLegend";

/**
 * Componente de calendario personalizado que bloquea fines de semana
 */
const Calendar = ({ onDateSelect, onClose, value, name }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  /**
   * Maneja la selección de una fecha, bloqueando fines de semana
   */
  const handleDateChange = (selectedDate) => {
    const date = new Date(selectedDate);
    const day = date.getUTCDay(); // 0 = domingo, 6 = sábado

    // Validar que no sea fin de semana
    if (day === 0 || day === 6) {
      alert("⚠️ No se permiten seleccionar sábados ni domingos.");
      return;
    }

    // Formatear fecha a YYYY-MM-DD para el input
    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Simular evento para onChange
    const event = {
      target: {
        name: name,
        value: formattedDate,
      },
    };

    onDateSelect(event);
  };

  /**
   * Navega al mes anterior
   */
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  /**
   * Navega al mes siguiente
   */
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="absolute top-full mt-2 z-50 bg-base-100 border border-base-300 shadow-xl rounded-lg p-4 w-80 max-h-96 overflow-y-auto">
      
      {/* Header con navegación */}
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
      />

      {/* Mes del calendario */}
      <div className="space-y-4">
        <CalendarMonth
          month={currentMonth}
          year={currentYear}
          onDateSelect={handleDateChange}
        />
      </div>

      {/* Leyenda de colores */}
      <CalendarLegend />

      {/* Botón de cierre */}
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-base-content/70 hover:text-base-content px-3 py-1 border border-base-300 rounded hover:bg-base-200 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Calendar;
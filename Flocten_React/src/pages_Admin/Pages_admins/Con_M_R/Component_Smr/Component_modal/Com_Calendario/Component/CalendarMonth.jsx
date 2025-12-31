/**
 * Componente que renderiza un mes completo del calendario
 */
const CalendarMonth = ({ month, year, onDateSelect }) => {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay(); // 0 = domingo, 6 = sábado

  const days = [];

  // Días vacíos al inicio para alinear el calendario
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${month}-${i}`} className="h-8 w-8"></div>);
  }

  // Generar días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    const isPast = date < today && !isToday;

    days.push(
      <button
        key={`${year}-${month}-${day}`}
        type="button"
        onClick={() => !isWeekend && !isPast && onDateSelect(date)}
        disabled={isWeekend || isPast}
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
          ${isToday ? "bg-primary text-primary-content" : ""}
          ${
            !isToday && !isWeekend && !isPast
              ? "hover:bg-base-300 cursor-pointer text-base-content"
              : "text-base-content/70"
          }
          ${isWeekend ? "bg-error/20 text-error/50 cursor-not-allowed" : ""}
          ${isPast ? "bg-base-200 text-base-300 cursor-not-allowed" : ""}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="mb-4">
      {/* Encabezado del mes */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-base-content text-sm">
          {new Date(year, month).toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["D", "L", "M", "X", "J", "V", "S"].map((day, index) => (
          <div
            key={day}
            className={`h-6 w-6 flex items-center justify-center text-xs font-medium
              ${
                index === 0 || index === 6
                  ? "text-error/50"
                  : "text-base-content/70"
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

export default CalendarMonth;

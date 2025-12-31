/**
 * Header del calendario con controles de navegación
 */
const CalendarHeader = ({ currentMonth, currentYear, onPrevious, onNext }) => {
  const getCurrentMonthName = () => {
    return new Date(currentYear, currentMonth).toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        type="button"
        onClick={onPrevious}
        className="p-2 hover:bg-base-300 rounded-lg transition-colors"
        title="Mes anterior"
      >
        <svg
          className="w-4 h-4 text-base-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h3 className="font-semibold text-base-content text-sm">
        {getCurrentMonthName()}
      </h3>

      <button
        type="button"
        onClick={onNext}
        className="p-2 hover:bg-base-300 rounded-lg transition-colors"
        title="Mes siguiente"
      >
        <svg
          className="w-4 h-4 text-base-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarHeader;

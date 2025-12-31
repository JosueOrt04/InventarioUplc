/**
 * Leyenda que explica los colores y estados del calendario
 */
const CalendarLegend = () => (
  <div className="mt-4 pt-3 border-t border-base-300 text-xs text-base-content/50 space-y-1">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <span>Hoy</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-error/20 rounded-full"></div>
      <span>Fin de semana no disponible</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-base-200 rounded-full"></div>
      <span>Fechas pasadas no disponibles</span>
    </div>
  </div>
);

export default CalendarLegend;

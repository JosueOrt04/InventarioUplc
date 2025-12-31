/**
 * Componente para mostrar unidades de medida
 */
const UnitDisplay = ({ unit }) => {
  if (!unit) return null;

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
      <span className="text-base-content/50 text-sm">{unit}</span>
    </div>
  );
};

export default UnitDisplay;

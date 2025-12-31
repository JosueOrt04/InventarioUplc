
const StatusSection = ({ prestamo }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
    <StatusBadge 
      label="Estado del Préstamo"
      value={prestamo.estado}
      type="estado"
    />
    <StatusBadge 
      label="Estado de Devolución"
      value={prestamo.estadoDevolucion}
      type="estadoDevolucion"
    />
    <StatusBadge 
      label="Devuelto"
      value={prestamo.devuelto ? "Sí" : "No"}
      type="devuelto"
    />
  </div>
);

const StatusBadge = ({ label, value, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'estado':
        return {
          activo: "bg-green-100 text-green-800",
          devuelto: "bg-blue-100 text-blue-800",
          atrasado: "bg-red-100 text-red-800",
          default: "bg-orange-100 text-orange-800"
        }[value] || "bg-orange-100 text-orange-800";
      
      case 'estadoDevolucion':
        return {
          completo: "bg-green-100 text-green-800",
          incompleto: "bg-orange-100 text-orange-800",
          default: "bg-yellow-100 text-yellow-800"
        }[value] || "bg-yellow-100 text-yellow-800";
      
      case 'devuelto':
        return value === "Sí" 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800";
      
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formattedValue = typeof value === 'string' 
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value;

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStyles()}`}>
        {formattedValue}
      </span>
    </div>
  );
};

export default StatusSection;
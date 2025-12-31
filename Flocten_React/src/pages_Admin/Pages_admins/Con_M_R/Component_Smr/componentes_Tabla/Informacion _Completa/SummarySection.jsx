import SectionWrapper from "./SectionWrapper";


const SummarySection = ({ prestamo, diasTranscurridos, estaAtrasado }) => (
  <SectionWrapper title="📊 Resumen del Préstamo">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <SummaryItem 
          label="Estado General:" 
          value={prestamo.devuelto ? "DEVUELTO" : "EN PRÉSTAMO"}
          color={prestamo.devuelto ? "green" : "blue"}
        />
        <SummaryItem 
          label="Completitud:" 
          value={prestamo.cantidadPrestada === prestamo.cantidadDevuelta ? "COMPLETO" : "INCOMPLETO"}
          color={prestamo.cantidadPrestada === prestamo.cantidadDevuelta ? "green" : "orange"}
        />
      </div>
      <div className="space-y-2">
        <SummaryItem 
          label="Tiempo Restante:" 
          value={estaAtrasado 
            ? `+${diasTranscurridos - prestamo.diasPrestamo} días de atraso`
            : `${prestamo.diasPrestamo - diasTranscurridos} días restantes`
          }
          color={estaAtrasado ? "red" : "green"}
        />
        <SummaryItem 
          label="Total de Evidencias:" 
          value={(prestamo.imagenesPrestamo?.length || 0) + (prestamo.imagenesDevolucion?.length || 0)}
          color="gray"
        />
      </div>
    </div>
  </SectionWrapper>
);

const SummaryItem = ({ label, value, color }) => {
  const colorClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
    orange: "text-orange-600",
    gray: "text-gray-900"
  };

  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${colorClasses[color]}`}>
        {value}
      </span>
    </div>
  );
};

export default SummarySection;
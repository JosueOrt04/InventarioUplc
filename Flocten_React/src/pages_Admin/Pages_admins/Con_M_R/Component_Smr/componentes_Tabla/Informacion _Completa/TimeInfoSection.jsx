import SectionWrapper from "./SectionWrapper";
import InfoField from "./InfoField";


const TimeInfoSection = ({ 
  prestamo, 
  fechaPrestamo, 
  fechaDevolucion, 
  diasTranscurridos, 
  estaAtrasado 
}) => (
  <SectionWrapper title="⏰ Información de Tiempos">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TimeField
        label="Fecha de Préstamo"
        date={fechaPrestamo}
      />
      {fechaDevolucion && (
        <TimeField
          label="Fecha de Devolución"
          date={fechaDevolucion}
        />
      )}
      <InfoField 
        label="Días de Préstamo" 
        value={`${prestamo.diasPrestamo} días`}
      />
      <div>
        <label className="text-sm font-medium text-gray-500 block mb-1">
          Días Transcurridos
        </label>
        <p className={`text-sm font-medium ${estaAtrasado ? "text-red-600" : "text-green-600"}`}>
          {diasTranscurridos} días
          {estaAtrasado && <span className="ml-1">(Atrasado)</span>}
        </p>
      </div>
    </div>
  </SectionWrapper>
);

const TimeField = ({ label, date }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 block mb-1">
      {label}
    </label>
    <p className="text-sm text-gray-900">
      {date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
);

export default TimeInfoSection;
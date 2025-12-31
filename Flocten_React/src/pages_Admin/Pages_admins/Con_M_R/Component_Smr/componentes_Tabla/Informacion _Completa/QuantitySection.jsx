import SectionWrapper from './SectionWrapper';


const QuantitySection = ({ prestamo }) => {
  const diferencia = prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);

  return (
    <SectionWrapper title="🔢 Gestión de Cantidades">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuantityCard
          label="Cantidad Prestada"
          value={prestamo.cantidadPrestada}
          className="bg-green-50 text-green-600"
        />
        <QuantityCard
          label="Cantidad Devuelta"
          value={prestamo.cantidadDevuelta || 0}
          className="bg-blue-50 text-blue-600"
        />
        <QuantityCard
          label="Diferencia"
          value={diferencia}
          className={diferencia === 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}
        />
      </div>
    </SectionWrapper>
  );
};

const QuantityCard = ({ label, value, className }) => (
  <div className={`text-center p-4 rounded-lg ${className}`}>
    <label className="text-sm font-medium text-gray-500 block mb-1">
      {label}
    </label>
    <p className="text-2xl font-bold">
      {value}
    </p>
  </div>
);

export default QuantitySection;
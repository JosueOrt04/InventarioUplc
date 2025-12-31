import SectionWrapper from './SectionWrapper';


const EvidenceSection = ({ prestamo, getImageUrl, tipo }) => {
  const imagenes = tipo === 'prestamo' 
    ? prestamo.imagenesPrestamo 
    : prestamo.imagenesDevolucion;

  if (!imagenes || imagenes.length === 0) return null;

  return (
    <SectionWrapper 
      title={`📸${tipo === 'prestamo' ? '📸' : '📷'} Evidencias ${tipo === 'prestamo' ? 'del Préstamo' : 'de la Devolución'}`}
    >
      <p className="text-sm text-gray-500 mb-4">
        {imagenes.length} imagen(es)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagenes.map((imagen, index) => (
          <EvidenceImage
            key={index}
            imagen={imagen}
            index={index}
            tipo={tipo}
            getImageUrl={getImageUrl}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

const EvidenceImage = ({ imagen, index, tipo, getImageUrl }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <img
      src={getImageUrl(imagen)}
      alt={`Evidencia ${tipo} ${index + 1}`}
      className="w-full h-48 object-cover cursor-pointer hover:opacity-90"
      onClick={() => window.open(getImageUrl(imagen), "_blank")}
    />
    <div className="p-3 bg-gray-50">
      <p className="text-xs text-gray-600 text-center">
        Imagen {index + 1} - {tipo === 'prestamo' ? 'Préstamo' : 'Devolución'}
      </p>
    </div>
  </div>
);

export default EvidenceSection;
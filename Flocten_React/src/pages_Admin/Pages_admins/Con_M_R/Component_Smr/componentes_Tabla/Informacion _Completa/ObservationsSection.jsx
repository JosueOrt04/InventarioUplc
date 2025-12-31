import SectionWrapper from "./SectionWrapper";




const ObservationsSection = ({ prestamo }) => {
  if (!prestamo.observaciones) return null;

  return (
    <SectionWrapper title="📝 Observaciones">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {prestamo.observaciones}
        </p>
      </div>
    </SectionWrapper>
  );
};

export default ObservationsSection;
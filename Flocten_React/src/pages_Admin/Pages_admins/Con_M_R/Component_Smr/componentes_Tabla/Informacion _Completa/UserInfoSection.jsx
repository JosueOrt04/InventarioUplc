import SectionWrapper from './SectionWrapper';
import InfoField from './InfoField';



const UserInfoSection = ({ prestamo }) => (
  <SectionWrapper title="👤 Información del Usuario">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoField 
        label="Nombre Completo" 
        value={prestamo.nombreUsuario}
        className="font-medium"
      />
      <InfoField 
        label="Número de Control" 
        value={`#${prestamo.controlNumberUsuario}`}
        className="font-mono"
      />
      <InfoField 
        label="ID de Usuario" 
        value={prestamo.usuario?.fullName || "—"}
        className="font-mono truncate"
      />
    </div>
  </SectionWrapper>
);

export default UserInfoSection;
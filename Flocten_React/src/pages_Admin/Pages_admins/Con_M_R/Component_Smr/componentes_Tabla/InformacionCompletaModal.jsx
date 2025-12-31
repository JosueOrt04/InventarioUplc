import { useState, useEffect } from 'react';
import ModalHeader from './Informacion _Completa/ModalHeader';
import StatusSection from './Informacion _Completa/StatusSection';
import UserInfoSection from './Informacion _Completa/UserInfoSection';
import ItemInfoSection from './Informacion _Completa/ItemInfoSection';
import QuantitySection from './Informacion _Completa/QuantitySection';
import TimeInfoSection from './Informacion _Completa/TimeInfoSection';
import EvidenceSection from './Informacion _Completa/EvidenceSection';
import ObservationsSection from './Informacion _Completa/ObservationsSection';
import SummarySection from './Informacion _Completa/SummarySection';
import ModalFooter from './Informacion _Completa/ModalFooter';
import { useLoanCalculations } from './Informacion _Completa/useLoanCalculations';

const InformacionCompletaModal = ({ prestamo, cerrarModal, getImageUrl }) => {
  const { fechaPrestamo, fechaDevolucion, diasTranscurridos, estaAtrasado } = 
    useLoanCalculations(prestamo);

  if (!prestamo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <ModalHeader prestamo={prestamo} cerrarModal={cerrarModal} />
        
        <div className="p-6 space-y-6">
          <StatusSection prestamo={prestamo} />
          <UserInfoSection prestamo={prestamo} />
          <ItemInfoSection prestamo={prestamo} />
          <QuantitySection prestamo={prestamo} />
          <TimeInfoSection 
            prestamo={prestamo}
            fechaPrestamo={fechaPrestamo}
            fechaDevolucion={fechaDevolucion}
            diasTranscurridos={diasTranscurridos}
            estaAtrasado={estaAtrasado}
          />
          <EvidenceSection 
            prestamo={prestamo} 
            getImageUrl={getImageUrl}
            tipo="prestamo"
          />
          <EvidenceSection 
            prestamo={prestamo} 
            getImageUrl={getImageUrl}
            tipo="devolucion"
          />
          <ObservationsSection prestamo={prestamo} />
          <SummarySection 
            prestamo={prestamo}
            diasTranscurridos={diasTranscurridos}
            estaAtrasado={estaAtrasado}
          />
        </div>

        <ModalFooter cerrarModal={cerrarModal} />
      </div>
    </div>
  );
};

export default InformacionCompletaModal;
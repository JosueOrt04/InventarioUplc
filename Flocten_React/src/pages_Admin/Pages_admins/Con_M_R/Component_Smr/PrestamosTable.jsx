import { useState } from "react";
import PrestamoRow from "./componentes_Tabla/PrestamoRow";
import ImagenesModal from "./componentes_Tabla/ImagenesModal";
import InformacionCompletaModal from "./componentes_Tabla/InformacionCompletaModal";
import { getImageUrl } from "./componentes_Tabla/utilsPrestamos";

const PrestamosTable = ({
  prestamos,
  loading,
  onDevolucion,
  hasPermission,
}) => {
  const [imagenModal, setImagenModal] = useState({
    isOpen: false,
    imagenes: [],
    imagenActual: 0,
    titulo: "",
  });

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    prestamo: null,
  });

  const handleVerImagenes = (prestamo, imagenIndex = 0) => {
    if (!prestamo.imagenesPrestamo?.length) return;
    setImagenModal({
      isOpen: true,
      imagenes: prestamo.imagenesPrestamo,
      imagenActual: imagenIndex,
      titulo: `Evidencia - ${prestamo.nombreItem} (${prestamo.nombreUsuario})`,
    });
  };

  const handleVerInformacionCompleta = (prestamo) => {
    setInfoModal({
      isOpen: true,
      prestamo: prestamo,
    });
  };

  const cerrarModalImagenes = () =>
    setImagenModal({
      isOpen: false,
      imagenes: [],
      imagenActual: 0,
      titulo: "",
    });

  const cerrarModalInfo = () =>
    setInfoModal({
      isOpen: false,
      prestamo: null,
    });

  const cambiarImagen = (direccion) => {
    setImagenModal((prev) => {
      let nuevoIndex =
        (prev.imagenActual + direccion + prev.imagenes.length) %
        prev.imagenes.length;
      return { ...prev, imagenActual: nuevoIndex };
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando préstamos...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Usuario",
              "Item",
              "Tipo",
              "Cantidad",
              "Fecha Préstamo",
              "Estado",
              "Evidencia",
              "Acciones",
              "Informacion Completa",
            ].map((th) => (
              <th
                key={th}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prestamos.map((prestamo) => (
            <PrestamoRow
              key={prestamo._id}
              prestamo={prestamo}
              onDevolucion={onDevolucion}
              hasPermission={hasPermission}
              getImageUrl={getImageUrl}
              handleVerImagenes={handleVerImagenes}
              handleVerInformacionCompleta={handleVerInformacionCompleta}
            />
          ))}
        </tbody>
      </table>

      {prestamos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron préstamos</p>
        </div>
      )}

      {imagenModal.isOpen && (
        <ImagenesModal
          modalData={imagenModal}
          cerrarModal={cerrarModalImagenes}
          cambiarImagen={cambiarImagen}
          getImageUrl={getImageUrl}
        />
      )}

      {infoModal.isOpen && (
        <InformacionCompletaModal
          prestamo={infoModal.prestamo}
          cerrarModal={cerrarModalInfo}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
};

export default PrestamosTable;

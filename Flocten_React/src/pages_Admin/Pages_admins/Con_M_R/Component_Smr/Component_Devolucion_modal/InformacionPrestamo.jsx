const InformacionPrestamo = ({ prestamo }) => {
  const pendientePorDevolver = prestamo.cantidadPrestada - (prestamo.cantidadDevuelta || 0);

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-3">
        Información del Préstamo
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-600">Usuario:</span>
          <p className="text-gray-800">{prestamo.nombreUsuario}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Item:</span>
          <p className="text-gray-800">{prestamo.nombreItem}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Cantidad Prestada:</span>
          <p className="text-gray-800">{prestamo.cantidadPrestada} unidades</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Cantidad Devuelta:</span>
          <p className="text-gray-800">{prestamo.cantidadDevuelta || 0} unidades</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Pendiente por devolver:</span>
          <p className="text-red-600 font-semibold">
            {pendientePorDevolver} unidades
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformacionPrestamo;
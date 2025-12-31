 

const ModalHeader = ({ prestamo, cerrarModal }) => (
  <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
    <div>
      <h3 className="text-xl font-bold text-gray-900">
        Información Completa del Préstamo
      </h3>
      <p className="text-sm text-gray-500">ID: {prestamo._id}</p>
    </div>
    <button
      onClick={cerrarModal}
      className="text-gray-400 hover:text-gray-600 text-xl bg-gray-100 hover:bg-gray-200 rounded-full p-2"
    >
      ✕
    </button>
  </div>
);

export default ModalHeader;
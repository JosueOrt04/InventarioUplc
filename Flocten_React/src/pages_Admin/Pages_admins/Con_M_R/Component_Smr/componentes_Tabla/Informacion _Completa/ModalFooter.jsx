

const ModalFooter = ({ cerrarModal }) => (
  <div className="flex justify-between items-center p-4 border-t bg-gray-50 sticky bottom-0">
    <div className="text-sm text-gray-500">
      Generado el {new Date().toLocaleDateString("es-ES")}
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
      >
        Imprimir
      </button>
      <button
        onClick={cerrarModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        Cerrar
      </button>
    </div>
  </div>
);

export default ModalFooter;
import EstadoBadge from "./EstadoBadge";
import { formatFecha } from "./utilsPrestamos";

const PrestamoRow = ({
  prestamo,
  onDevolucion,
  hasPermission,
  handleVerImagenes,
  handleVerInformacionCompleta,
  getImageUrl,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {prestamo.nombreUsuario}
        </div>
        <div className="text-sm text-gray-500">
          #{prestamo.controlNumberUsuario}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-900">{prestamo.nombreItem}</td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            prestamo.tipoItem === "Reactivo"
              ? "bg-purple-100 text-purple-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {prestamo.tipoItem}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-900">
        {prestamo.cantidadPrestada}
        {prestamo.cantidadDevuelta > 0 &&
          ` (Devuelto: ${prestamo.cantidadDevuelta})`}
      </td>

      <td className="px-6 py-4 text-sm text-gray-900">
        {formatFecha(prestamo.fecha_prestamo)}
      </td>

      <td className="px-6 py-4">
        <EstadoBadge estado={prestamo.estado} />
      </td>

      {/* Evidencias */}
      <td className="px-6 py-4">
        {prestamo.imagenesPrestamo?.length > 0 ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVerImagenes(prestamo)}
              className="inline-flex items-center px-3 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              Ver ({prestamo.imagenesPrestamo.length})
            </button>
            <div className="flex -space-x-2">
              {prestamo.imagenesPrestamo.slice(0, 2).map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={getImageUrl(img)}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover cursor-pointer"
                    onClick={() => handleVerImagenes(prestamo, i)}
                  />
                  {i === 1 && prestamo.imagenesPrestamo.length > 2 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-xs">
                      +{prestamo.imagenesPrestamo.length - 2}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span className="text-xs text-gray-400">Sin imágenes</span>
        )}
      </td>

      <td className="px-6 py-4 text-sm font-medium">
        {!prestamo.devuelto && hasPermission("modificacion") && (
          <button
            onClick={() => onDevolucion(prestamo)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
          >
            Devolver
          </button>
        )}
      </td>

      {/* Información Completa */}
      <td className="px-6 py-4 text-sm font-medium">
        <button
          onClick={() => handleVerInformacionCompleta(prestamo)}
          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Ver Info
        </button>
      </td>
    </tr>
  );
};

export default PrestamoRow;

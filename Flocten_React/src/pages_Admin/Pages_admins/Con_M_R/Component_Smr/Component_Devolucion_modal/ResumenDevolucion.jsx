const ResumenDevolucion = ({ resumen, estado }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 className="font-semibold text-blue-800 mb-2">
      Resumen de la Devolución
    </h4>
    <div className="space-y-1 text-sm text-blue-700">
      <p>
        • Cantidad prestada inicialmente:{" "}
        <strong>{resumen.cantidadPrestada}</strong>
      </p>
      <p>
        • Ya devuelto anteriormente:{" "}
        <strong>{resumen.yaDevuelto}</strong>
      </p>
      <p>
        • Pendiente por devolver:{" "}
        <strong>{resumen.pendienteInicial}</strong>
      </p>
      <p>
        • Esta devolución: <strong>{resumen.estaDevolucion}</strong>
      </p>
      <p>
        • Después de esta devolución:
        <strong
          className={
            estado.tipo === "completa"
              ? "text-green-600"
              : "text-orange-600"
          }
        >
          {" "}
          {resumen.pendienteDespues}
        </strong>
      </p>
      <p>
        • Imágenes de evidencia:{" "}
        <strong>{resumen.imagenesCount}</strong>
      </p>
    </div>
  </div>
);

export default ResumenDevolucion;
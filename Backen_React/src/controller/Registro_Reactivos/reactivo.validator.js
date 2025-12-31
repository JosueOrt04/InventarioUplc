export const reactivoValidator = {
  // Validar campos requeridos
  validarCamposRequeridos: (datos) => {
    const camposRequeridos = [
      "controlNumber",
      "fullName",
      "codigo",
      "imagenReactivo",
      "imagenSimbolo",
      "nombre",
      "formula",
      "cantidad",
      "numeroLote",
      "concentracion",
      "descripcion",
      "primerosAuxilios",
      "manejoSeguro",
      "pictogramasPeligro",
      "frasesPeligro",
    ];

    const camposFaltantes = camposRequeridos.filter((campo) => !datos[campo]);

    if (camposFaltantes.length > 0) {
      throw new Error(
        `Campos requeridos faltantes: ${camposFaltantes.join(", ")}`
      );
    }

    // ✅ AGREGAR ESTA LÍNEA: Validar que la cantidad sea un número entero
    datos.cantidad = validarCantidadEntera(datos.cantidad);
  },

  // Validar término de búsqueda
  validarTerminoBusqueda: (termino) => {
    if (!termino || termino.trim().length === 0) {
      throw new Error("Por favor, ingrese un término de búsqueda");
    }

    // Cambiar de 2 a 1 carácter mínimo
    if (termino.trim().length < 1) {
      throw new Error("El término de búsqueda debe tener al menos 1 carácter");
    }
  },
};

// reactivoValidator.js - Versión más simple y directa
export const validarCantidadEntera = (cantidad) => {
  if (cantidad === undefined || cantidad === null || cantidad === "") {
    throw new Error("La cantidad es requerida");
  }

  const cantidadStr = String(cantidad).trim();

  // ✅ Validación PRINCIPAL: Solo dígitos del 1-9, y opcionalmente 0 solo si no es el único carácter
  if (!/^[1-9]\d*$/.test(cantidadStr)) {
    throw new Error(
      "La cantidad debe ser un número entero positivo mayor a cero (no se permiten letras, símbolos, decimales, espacios o ceros a la izquierda)"
    );
  }

  const cantidadNum = Number(cantidadStr);

  // Validaciones adicionales por seguridad
  if (
    isNaN(cantidadNum) ||
    !Number.isInteger(cantidadNum) ||
    cantidadNum <= 0
  ) {
    throw new Error("La cantidad debe ser un número entero positivo válido");
  }

  return cantidadNum.toString();
};

import Reactivos from "../../models/registro.model.js";

export const reactivoService = {
  // Crear reactivo

  // Crear reactivo
  crearReactivo: async (reactivoData) => {
    // ✅ Validación adicional en el servicio (por si acaso)
    if (reactivoData.cantidad) {
      const cantidadStr = String(reactivoData.cantidad).trim();
      if (!/^[1-9]\d*$/.test(cantidadStr)) {
        throw new Error(
          "La cantidad debe ser un número entero positivo válido"
        );
      }
    }

    const reactivoExistente = await Reactivos.findOne({
      codigo: reactivoData.codigo,
    });

    if (reactivoExistente) {
      throw new Error("El código ya está registrado");
    }

    const nuevoReactivo = new Reactivos({
      ...reactivoData,
      pictogramasPeligro: Array.isArray(reactivoData.pictogramasPeligro)
        ? reactivoData.pictogramasPeligro
        : [reactivoData.pictogramasPeligro],
      frasesPeligro: Array.isArray(reactivoData.frasesPeligro)
        ? reactivoData.frasesPeligro
        : [reactivoData.frasesPeligro],
    });

    return await nuevoReactivo.save();
  },

  // Buscar reactivos
  buscarReactivos: async (termino, limite = 100) => {
    if (!termino || termino.trim().length === 0) {
      throw new Error("El término de búsqueda no puede estar vacío");
    }

    // Permitir búsquedas con 1 carácter o más
    if (termino.trim().length < 1) {
      throw new Error("El término de búsqueda debe tener al menos 1 carácter");
    }

    return await Reactivos.find({
      $or: [
        { codigo: { $regex: termino, $options: "i" } },
        { nombre: { $regex: termino, $options: "i" } },
      ],
    }).limit(limite);
  },

  // Obtener por código
  obtenerPorCodigo: async (codigo) => {
    const reactivo = await Reactivos.findOne({ codigo });
    if (!reactivo) {
      throw new Error("Reactivo no encontrado");
    }
    return reactivo;
  },

  // En reactivo.service.js - función actualizarReactivo
  actualizarReactivo: async (codigo, datosActualizados) => {
    const reactivoExistente = await Reactivos.findOne({ codigo });
    if (!reactivoExistente) {
      throw new Error("Reactivo no encontrado");
    }

    // ✅ Validar cantidad si se está actualizando
    if (datosActualizados.cantidad) {
      const cantidadStr = String(datosActualizados.cantidad).trim();
      if (!/^[1-9]\d*$/.test(cantidadStr)) {
        throw new Error(
          "La cantidad debe ser un número entero positivo válido"
        );
      }
    }

    // Verificar duplicado de código
    if (datosActualizados.codigo && datosActualizados.codigo !== codigo) {
      const codigoExistente = await Reactivos.findOne({
        codigo: datosActualizados.codigo,
      });
      if (codigoExistente) {
        throw new Error("El nuevo código ya está en uso por otro reactivo");
      }
    }

    return await Reactivos.findOneAndUpdate({ codigo }, datosActualizados, {
      new: true,
      runValidators: true,
    });
  },

  // Eliminar reactivo
  eliminarReactivo: async (codigo) => {
    const reactivoEliminado = await Reactivos.findOneAndDelete({ codigo });
    if (!reactivoEliminado) {
      throw new Error("Reactivo no encontrado");
    }
    return reactivoEliminado;
  },

  // Listar todos
  listarReactivos: async () => {
    return await Reactivos.find();
  },
};

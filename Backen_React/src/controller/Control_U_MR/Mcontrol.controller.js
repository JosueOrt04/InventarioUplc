// controller/Control_U_MR/Mcontrol.controller.js
import Prestamo from "../../models/Prestamo.model.js";
import User from "../../models/user.model.js";
import Reactivos from "../../models/registro.model.js";
import Herramienta from "../../models/Herramienta.model.js";
import fs from "fs";
import path from "path";

// 📦 Registrar un préstamo
export const crearPrestamo = async (req, res) => {
  try {
    const {
      userId,
      tipoItem,
      itemId,
      cantidadPrestada,
      observaciones,
      imagenesPrestamo,
      diasPrestamo,
    } = req.body;

    // Validación básica
    if (!userId || !tipoItem || !itemId || !cantidadPrestada) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // ✅ Validar que cantidadPrestada sea un número entero
    const cantidadNum = Number(cantidadPrestada);
    if (!Number.isInteger(cantidadNum) || cantidadNum <= 0) {
      return res.status(400).json({
        message: "La cantidad prestada debe ser un número entero positivo.",
      });
    }

    // Buscar usuario
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Buscar item (reactivo o herramienta)
    let item;
    if (tipoItem === "Reactivo") {
      item = await Reactivos.findById(itemId);
    } else if (tipoItem === "Herramienta") {
      item = await Herramienta.findById(itemId);
    } else {
      return res.status(400).json({ message: "Tipo de ítem no válido." });
    }

    if (!item) {
      return res.status(404).json({ message: `${tipoItem} no encontrado.` });
    }

    // Validar disponibilidad
    const cantidadDisponible = parseFloat(item.cantidad);
    if (cantidadDisponible < cantidadNum) {
      return res.status(400).json({
        message: `No hay suficiente cantidad disponible de ${item.nombre}. Solo quedan ${item.cantidad}.`,
      });
    }

    // Restar la cantidad prestada
    item.cantidad = (cantidadDisponible - cantidadNum).toString();
    await item.save();

    // Crear el préstamo
    const nuevoPrestamo = new Prestamo({
      usuario: usuario._id,
      controlNumberUsuario: usuario.controlNumber,
      nombreUsuario: usuario.fullName,
      tipoItem,
      itemId: item._id,
      nombreItem: item.nombre,
      cantidadPrestada: cantidadNum, // Usar el número validado
      observaciones,
      diasPrestamo: diasPrestamo || 7,
      imagenesPrestamo: imagenesPrestamo || [],
    });

    await nuevoPrestamo.save();

    res.status(201).json({
      message: "✅ Préstamo registrado correctamente.",
      prestamo: nuevoPrestamo,
    });
  } catch (error) {
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// 📤 Devolver préstamo
export const devolverPrestamo = async (req, res) => {
  try {
    const { prestamoId } = req.params;
    const { cantidadDevuelta, observaciones, imagenesDevolucion } = req.body;

    console.log("📥 Datos recibidos:", {
      prestamoId,
      cantidadDevuelta,
      observaciones,
      imagenesDevolucion,
      tipoDato: typeof imagenesDevolucion,
      esArray: Array.isArray(imagenesDevolucion),
    });

    const prestamo = await Prestamo.findById(prestamoId);
    if (!prestamo) {
      return res.status(404).json({ message: "Préstamo no encontrado." });
    }

    if (prestamo.devuelto) {
      return res
        .status(400)
        .json({ message: "Este préstamo ya fue devuelto." });
    }

    // ✅ CONVERSIÓN EXPLÍCITA A NÚMERO ENTERO
    const cantidadDevueltaNum = parseInt(cantidadDevuelta, 10);
    if (isNaN(cantidadDevueltaNum) || cantidadDevueltaNum <= 0) {
      return res.status(400).json({
        message: "La cantidad devuelta debe ser un número entero positivo.",
      });
    }

    if (cantidadDevueltaNum > prestamo.cantidadPrestada) {
      return res
        .status(400)
        .json({ message: "No puede devolver más de lo prestado." });
    }

    // Buscar ítem
    const Model = prestamo.tipoItem === "Reactivo" ? Reactivos : Herramienta;
    const item = await Model.findById(prestamo.itemId);

    if (!item) {
      return res
        .status(404)
        .json({ message: "Elemento del préstamo no encontrado." });
    }

    // ✅ ACTUALIZAR STOCK
    const cantidadActual = parseFloat(item.cantidad) || 0;
    item.cantidad = (cantidadActual + cantidadDevueltaNum).toString();
    await item.save();

    // ✅ ASEGURAR QUE imagenesDevolucion ES UN ARRAY
 // ✅ Normalizar imágenes de devolución correctamente
let nuevasImagenes = [];

if (Array.isArray(imagenesDevolucion)) {
  nuevasImagenes = imagenesDevolucion;
} else if (
  imagenesDevolucion &&
  typeof imagenesDevolucion === "object" &&
  Array.isArray(imagenesDevolucion.imagenesDevolucion)
) {
  nuevasImagenes = imagenesDevolucion.imagenesDevolucion;
} else if (typeof imagenesDevolucion === "string") {
  nuevasImagenes = [imagenesDevolucion];
}


    // ✅ ACUMULAR IMÁGENES (opcional, si quieres mantener histórico)
    const imagenesFinales = [
      ...(prestamo.imagenesDevolucion || []),
      ...nuevasImagenes,
    ];

    // ✅ ACTUALIZAR PRÉSTAMO
    const cantidadTotalDevuelta =
      (prestamo.cantidadDevuelta || 0) + cantidadDevueltaNum;

    prestamo.cantidadDevuelta = cantidadTotalDevuelta;
    prestamo.fecha_devolucion = new Date();
    prestamo.observaciones = observaciones || prestamo.observaciones;
    prestamo.imagenesDevolucion = imagenesFinales; // ✅ GUARDAR ARRAY COMPLETO

    // Determinar estado
    if (cantidadTotalDevuelta < prestamo.cantidadPrestada) {
      prestamo.estadoDevolucion = "incompleto";
      prestamo.estado = "incompleto";
      prestamo.devuelto = false;
    } else {
      prestamo.estadoDevolucion = "completo";
      prestamo.estado = "devuelto";
      prestamo.devuelto = true;
    }

    await prestamo.save();

    res.status(200).json({
      message: `✅ Devolución registrada correctamente.`,
      prestamo,
    });
  } catch (error) {
    console.error("❌ Error en devolverPrestamo:", error);
    res.status(500).json({
      message: "Error interno del servidor.",
      error: error.message, // Solo en desarrollo
    });
  }
};

// 📋 Listar todos los préstamos con filtros
export const listarPrestamos = async (req, res) => {
  try {
    const { estado, tipoItem, usuario, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (estado) filter.estado = estado;
    if (tipoItem) filter.tipoItem = tipoItem;
    if (usuario) filter.usuario = usuario;

    const prestamos = await Prestamo.find(filter)
      .populate("usuario", "fullName controlNumber")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Prestamo.countDocuments(filter);

    res.status(200).json({
      message: "✅ Lista de préstamos obtenida correctamente.",
      prestamos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error al listar préstamos:", error);
    res.status(500).json({ message: "Error al obtener lista de préstamos." });
  }
};

// 📊 Obtener estadísticas
export const obtenerEstadisticas = async (req, res) => {
  try {
    const totalPrestamos = await Prestamo.countDocuments();
    const prestamosActivos = await Prestamo.countDocuments({
      estado: "activo",
    });
    const prestamosAtrasados = await Prestamo.countDocuments({
      estado: "atrasado",
    });
    const prestamosDevueltos = await Prestamo.countDocuments({
      estado: "devuelto",
    });

    // Préstamos por tipo
    const prestamosReactivos = await Prestamo.countDocuments({
      tipoItem: "Reactivo",
    });
    const prestamosHerramientas = await Prestamo.countDocuments({
      tipoItem: "Herramienta",
    });

    // Top usuarios con más préstamos
    const topUsuarios = await Prestamo.aggregate([
      {
        $group: {
          _id: "$usuario",
          totalPrestamos: { $sum: 1 },
          nombreUsuario: { $first: "$nombreUsuario" },
        },
      },
      { $sort: { totalPrestamos: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      totalPrestamos,
      prestamosActivos,
      prestamosAtrasados,
      prestamosDevueltos,
      prestamosReactivos,
      prestamosHerramientas,
      topUsuarios,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas." });
  }
};

// 🔍 Buscar préstamos
export const buscarPrestamos = async (req, res) => {
  try {
    const { query } = req.query;

    const prestamos = await Prestamo.find({
      $or: [
        { nombreUsuario: { $regex: query, $options: "i" } },
        { nombreItem: { $regex: query, $options: "i" } },
        { controlNumberUsuario: { $regex: query, $options: "i" } },
      ],
    })
      .populate("usuario", "fullName controlNumber")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      message: "✅ Búsqueda completada.",
      prestamos,
    });
  } catch (error) {
    console.error("Error al buscar préstamos:", error);
    res.status(500).json({ message: "Error en la búsqueda." });
  }
};

// 📋 Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(
      {},
      "fullName controlNumber email role"
    ).sort({ fullName: 1 });

    res.status(200).json({
      message: "✅ Lista de usuarios obtenida correctamente.",
      users: usuarios,
    });
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al obtener lista de usuarios." });
  }
};

// 🧪 Listar reactivos
export const listarReactivos = async (req, res) => {
  try {
    const reactivos = await Reactivos.find(
      {},
      "nombre cantidad unidad ubicacion"
    ).sort({ nombre: 1 });

    res.status(200).json({
      message: "✅ Lista de reactivos obtenida correctamente.",
      reactivos: reactivos,
    });
  } catch (error) {
    console.error("Error al listar reactivos:", error);
    res.status(500).json({ message: "Error al obtener lista de reactivos." });
  }
};

// 🔧 Listar herramientas
export const listarHerramientas = async (req, res) => {
  try {
    const herramientas = await Herramienta.find(
      {},
      "nombre cantidad estado ubicacion"
    ).sort({ nombre: 1 });

    res.status(200).json({
      message: "✅ Lista de herramientas obtenida correctamente.",
      herramientas: herramientas,
    });
  } catch (error) {
    console.error("Error al listar herramientas:", error);
    res
      .status(500)
      .json({ message: "Error al obtener lista de herramientas." });
  }
};

import Herramienta from "../../models/Herramienta.model.js";

// Función para registrar herramienta (ya la tienes)
export const Registro_Herramienta = async (req, res) => {
  try {
    const {
      controlNumber,
      fullName,
      codigo,
      imagenHerramienta,
      imagenAdicional,
      nombre,
      tipo,
      cantidad,
      numeroLote,
      numeroSerie,
      descripcion,
      estado,
    } = req.body;

    if (!controlNumber || !fullName || !codigo || !nombre || !tipo || !estado) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios para registrar la herramienta.",
      });
    }

    const herramientaExistente = await Herramienta.findOne({ codigo });
    if (herramientaExistente) {
      return res.status(400).json({
        success: false,
        message: "El código de la herramienta ya está registrado",
      });
    }

    const nuevaHerramienta = new Herramienta({
      controlNumber,
      fullName,
      codigo,
      imagenHerramienta,
      imagenAdicional,
      nombre,
      tipo,
      cantidad,
      numeroLote,
      numeroSerie,
      descripcion,
      estado,
    });

    await nuevaHerramienta.save();

    res.status(201).json({
      success: true,
      message: "Herramienta registrada correctamente",
      data: nuevaHerramienta,
    });
  } catch (error) {
    console.error("Error en registro de herramienta:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al registrar la herramienta",
      error: error.message,
    });
  }
};

// ✅ NUEVA: Función para obtener herramienta por ID
export const obtenerHerramientaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const herramienta = await Herramienta.findById(id);
    if (!herramienta) {
      return res.status(404).json({
        success: false,
        message: "Herramienta no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Herramienta encontrada",
      data: herramienta,
    });
  } catch (error) {
    console.error("Error al obtener herramienta:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener la herramienta",
      error: error.message,
    });
  }
};

// ✅ NUEVA: Función para buscar herramientas
export const buscarHerramientas = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Se requiere un término de búsqueda",
      });
    }

    const herramientas = await Herramienta.find({
      $or: [
        { codigo: { $regex: q, $options: "i" } },
        { nombre: { $regex: q, $options: "i" } },
      ],
    }).limit(10);

    res.json({
      success: true,
      message: `Se encontraron ${herramientas.length} herramientas`,
      data: herramientas,
    });
  } catch (error) {
    console.error("Error al buscar herramientas:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al buscar herramientas",
      error: error.message,
    });
  }
};


// ✅ Función para eliminar herramienta
export const eliminarHerramienta = async (req, res) => {
  try {
    const { id } = req.params;


    if (!id || id === "undefined") {
  
      return res.status(400).json({
        success: false,
        message: "ID de herramienta no válido",
      });
    }

    const herramienta = await Herramienta.findByIdAndDelete(id);

    if (!herramienta) {
    
      return res.status(404).json({
        success: false,
        message: "Herramienta no encontrada",
      });
    }

    
    res.json({
      success: true,
      message: "Herramienta eliminada correctamente",
    });
  } catch (error) {
    console.error("❌ Error al eliminar herramienta:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID de herramienta no válido",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar la herramienta",
      error: error.message,
    });
  }
};
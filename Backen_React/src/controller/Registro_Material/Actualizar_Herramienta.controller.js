// controllers/Actualizar_Herramienta.controller.js
import Herramienta from "../../models/Herramienta.model.js";

export const Actualizar_Herramienta = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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

    // Validar que el producto existe
    const herramientaExistente = await Herramienta.findById(id);
    if (!herramientaExistente) {
      return res.status(404).json({
        success: false,
        message: "Herramienta no encontrada",
      });
    }

    // Validar campos requeridos
    if (!nombre || !tipo || !estado) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    // Actualizar la herramienta
    const herramientaActualizada = await Herramienta.findByIdAndUpdate(
      id,
      {
        imagenHerramienta,
        imagenAdicional,
        nombre,
        tipo,
        cantidad,
        numeroLote,
        numeroSerie,
        descripcion,
        estado,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Herramienta actualizada correctamente",
      data: herramientaActualizada,
    });
  } catch (error) {
    console.error("Error actualizando herramienta:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al actualizar la herramienta",
      error: error.message,
    });
  }
};
// ... código existente ...

// Nuevo endpoint para buscar herramientas
export const Buscar_Herramientas = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Se requiere un término de búsqueda"
      });
    }

    const herramientas = await Herramienta.find({
      $or: [
        { codigo: { $regex: q, $options: 'i' } },
        { nombre: { $regex: q, $options: 'i' } }
      ]
    }).limit(10);

    res.json({
      success: true,
      message: `Se encontraron ${herramientas.length} herramientas`,
      data: herramientas
    });

  } catch (error) {
    console.error("Error al buscar herramientas:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al buscar herramientas",
      error: error.message
    });
  }
};
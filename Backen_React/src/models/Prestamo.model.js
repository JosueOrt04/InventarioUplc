// models/Prestamo.model.js
import mongoose from "mongoose";

const prestamoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  controlNumberUsuario: {
    type: String,
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  tipoItem: {
    type: String,
    enum: ["Reactivo", "Herramienta"],
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'tipoItem'
  },
  nombreItem: {
    type: String,
    required: true
  },
  cantidadPrestada: {
    type: Number,
    required: true,
    min: 0
  },
  cantidadDevuelta: {
    type: Number,
    default: 0
  },
  fecha_prestamo: {
    type: Date,
    default: Date.now
  },
  fecha_devolucion: {
    type: Date
  },
  estado: {
    type: String,
    enum: ["activo", "devuelto", "atrasado", "incompleto"],
    default: "activo"
  },
  estadoDevolucion: {
    type: String,
    enum: ["completo", "incompleto", "pendiente"],
    default: "pendiente"
  },
  devuelto: {
    type: Boolean,
    default: false
  },
  observaciones: String,
  imagenesPrestamo: [String],
  imagenesDevolucion: [String],
  diasPrestamo: {
    type: Number,
    default: 7
  }
}, {
  timestamps: true
});

// Índices para mejor performance
prestamoSchema.index({ usuario: 1, estado: 1 });
prestamoSchema.index({ tipoItem: 1, itemId: 1 });
prestamoSchema.index({ fecha_prestamo: -1 });

export default mongoose.model("Prestamo", prestamoSchema);
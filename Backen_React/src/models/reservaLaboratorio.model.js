import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    asesorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    controlNumberAsesor: {
      type: String,
      required: true,
    },
    nombreAsesor: {
      type: String,
      required: true,
    },
    imagenAsesor: {
      type: String,
      default: "",
    },
    laboratorio: {
      type: String,
      required: true,
    },
    fechaReserva: {
      type: Date,
      required: true,
    },
    horaInicio: {
      type: String,
      required: true,
    },
    horaFin: {
      type: String,
      required: true,
    },
    turno: {
      type: String,
      enum: ["AM", "PM", "NT"],
      required: true,
    },
 estado: {
  type: String,
  enum: ["reservado", "en_uso", "tiempo_finalizado", "finalizado", "cancelado"],
  default: "reservado",
},
    razonCancelacion: {
      type: String,
      default: "",
    },
    materia: {
      type: String,
      default: "",
    },
    numeroAlumnos: {
      type: Number,
      default: 0,
    },
    equiposSolicitados: [
      {
        type: String,
      },
    ],
    observacionRecepcion: {
      type: String,
      default: "",
    },
    imagenRecepcion: {
      type: String,
      default: "",
    },
    imagenDevolucion: {
      type: String,
      default: "",
    },
    comentarioDevolucion: {
      type: String,
      default: "",
    },
    notificado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔹 ÍNDICE ÚNICO: Evita reservas dobles solo para estados NO cancelados
reservaSchema.index(
  { fechaReserva: 1, horaInicio: 1, horaFin: 1, laboratorio: 1 },
  {
    partialFilterExpression: { estado: { $ne: "cancelado" } },
    name: "unique_horario_no_cancelado",
  }
);

const ReservaLaboratorio = mongoose.model("ReservaLaboratorio", reservaSchema);
export default ReservaLaboratorio;

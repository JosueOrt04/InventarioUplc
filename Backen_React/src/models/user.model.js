// user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    controlNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    PermisosEx: {
      type: {
        lectura: { type: Boolean, default: false },
        registro: { type: Boolean, default: false },
        modificacion: { type: Boolean, default: false },
        eliminacion: { type: Boolean, default: false }
      },
      required: true,
      default: () => ({})
    },

    blocked: {
  type: Boolean,
  default: false,
},

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
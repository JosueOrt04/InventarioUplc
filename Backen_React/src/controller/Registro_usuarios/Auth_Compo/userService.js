import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

export const handleUserCreation = async (userData) => {
  const { fullName, controlNumber, password, role, PermisosEx } = userData;

  const isAdmin = role === "admin";

  const permisosFinales = isAdmin
    ? {
        lectura: true,
        registro: true,
        modificacion: true,
        eliminacion: true,
      }
    : {
        lectura: PermisosEx?.lectura || false,
        registro: PermisosEx?.registro || false,
        modificacion: PermisosEx?.modificacion || false,
        eliminacion: PermisosEx?.eliminacion || false,
      };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    controlNumber,
    password: hashedPassword,
    role: isAdmin ? "admin" : "user",
    PermisosEx: permisosFinales,
  });

  await newUser.save();
  return newUser;
};
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

// Actualizar nombre del usuario autenticado
export const updateName = async (req, res) => {
  try {
    const { fullName } = req.body;
    const userId = req.user._id;

    if (!fullName?.trim()) {
      return res
        .status(400)
        .json({ message: "El nombre no puede estar vacío" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName: fullName.trim() },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Nombre actualizado correctamente",
      user: updatedUser, // Asegúrate de enviar el usuario actualizado
    });
  } catch (error) {
    console.error("Error actualizando nombre:", error);
    res.status(500).json({ message: "Error al actualizar el nombre" });
  }
};

// Actualizar contraseña del usuario autenticado
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Validaciones
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Se requieren ambas contraseñas" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Mínimo 6 caracteres" });
    }

    // Verificar contraseña actual
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

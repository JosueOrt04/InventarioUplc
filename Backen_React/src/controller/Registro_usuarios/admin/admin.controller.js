import User from "../../../models/user.model.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // excluir password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar permisos o datos
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, role, PermisosEx } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { fullName, role, PermisosEx },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Bloquear usuario (agregando campo bloqueado)
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const user = await User.findByIdAndUpdate(id, { blocked }, { new: true });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res
      .status(200)
      .json({
        message: blocked ? "Usuario bloqueado" : "Usuario desbloqueado",
        user,
      });
  } catch (error) {
    console.error("Error al bloquear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getPrestamo = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // excluir password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
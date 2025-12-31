import { useState, useEffect } from "react";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { axiosInstance } from "../../../../../lib/axios";
import toast from "react-hot-toast";

export const useUsers = () => {
  const { authUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Función para verificar si un usuario es administrador
  const isAdminUser = (user) => {
    return user.PermisosEx?.isAdmin === true || user.role === "admin";
  };

  // Función para verificar si es el usuario actual autenticado
  const isCurrentUser = (user) => {
    return user._id === authUser?._id;
  };

  // Función para verificar si es otro administrador (no el actual)
  const isOtherAdmin = (user) => {
    return isAdminUser(user) && !isCurrentUser(user);
  };

  // Función para verificar si puede realizar acciones sobre el usuario
  const canPerformAction = (user) => {
    if (isCurrentUser(user)) {
      toast.error("No puedes realizar esta acción sobre tu propia cuenta");
      return false;
    }

    if (isOtherAdmin(user)) {
      toast.error("No puedes realizar esta acción sobre otros administradores");
      return false;
    }

    return true;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      toast.error("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const filteredUsers = users.filter((user) => {
  const fullName = user.fullName || "";
  const controlNumber = user.controlNumber || "";
  const search = searchTerm.toLowerCase();

  return (
    fullName.toLowerCase().includes(search) ||
    controlNumber.toLowerCase().includes(search)
  );
});


  const handleEditUser = (user) => {
    if (!canPerformAction(user)) return;

    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find((u) => u._id === userId);

    if (!canPerformAction(userToDelete)) return;

    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await axiosInstance.delete(`/admin/users/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("Usuario eliminado correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar usuario");
      }
    }
  };

  const handleSavePermissions = async (permissions) => {
    // Validar que no se quite el permiso de admin a sí mismo
    if (isCurrentUser(selectedUser) && !permissions.isAdmin) {
      toast.error(
        "No puedes quitarte los permisos de administrador a ti mismo"
      );
      return;
    }

    // Validar que no se editen permisos de otros administradores
    if (isOtherAdmin(selectedUser)) {
      toast.error("No puedes modificar los permisos de otros administradores");
      return;
    }

    setUpdating(true);
    try {
      const res = await axiosInstance.put(`/admin/users/${selectedUser._id}`, {
        PermisosEx: permissions,
      });
      setUsers(users.map((u) => (u._id === selectedUser._id ? res.data : u)));
      toast.success("Permisos actualizados");
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar permisos");
    } finally {
      setUpdating(false);
    }
  };

  const togglePermission = (permission) => {
    if (selectedUser) {
      // Prevenir que se quite el permiso de admin a sí mismo
      if (
        isCurrentUser(selectedUser) &&
        permission === "isAdmin" &&
        selectedUser.PermisosEx?.isAdmin
      ) {
        toast.error(
          "No puedes quitarte los permisos de administrador a ti mismo"
        );
        return;
      }

      // Prevenir editar permisos de otros administradores
      if (isOtherAdmin(selectedUser)) {
        toast.error(
          "No puedes modificar los permisos de otros administradores"
        );
        return;
      }

      setSelectedUser({
        ...selectedUser,
        PermisosEx: {
          ...selectedUser.PermisosEx,
          [permission]: !selectedUser.PermisosEx[permission],
        },
      });
    }
  };

  const handleBlockUser = async (user) => {
    if (!canPerformAction(user)) return;

    const confirm = window.confirm(
      `¿Deseas ${user.blocked ? "desbloquear" : "bloquear"} a ${user.fullName}?`
    );
    if (!confirm) return;

    try {
    

      const res = await axiosInstance.patch(
        `/admin/users_Block/${user._id}/block`,
        {
          blocked: !user.blocked,
        }
      );

     
      setUsers(users.map((u) => (u._id === user._id ? res.data.user : u)));
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje:", error.message);
      console.error("URL intentada:", error.config?.url);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Datos:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      }

      toast.error("Error de conexión al bloquear usuario");
    }
  };

  return {
    authUser,
    users,
    selectedUser,
    showModal,
    searchTerm,
    loading,
    updating,
    filteredUsers,
    setSearchTerm,
    setShowModal,
    setSelectedUser,
    fetchUsers,
    handleEditUser,
    handleDeleteUser,
    handleSavePermissions,
    togglePermission,
    handleBlockUser,
    // Exportar funciones de validación
    isAdminUser,
    isCurrentUser,
    isOtherAdmin,
    canPerformAction,
  };
};

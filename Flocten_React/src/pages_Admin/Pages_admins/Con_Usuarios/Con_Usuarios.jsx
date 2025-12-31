import { useUsers } from "./Control_Usuario/Hooks/useUsers";
import UserStats from "./Control_Usuario/UserStats";
import SearchBar from "./Control_Usuario/SearchBar";
import UsersTable from "./Control_Usuario/UsersTable";
import PermissionsModal from "./Control_Usuario/PermissionsModal";

const Con_Usuarios = () => {
  const {
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
    isOtherAdmin,
  } = useUsers();

  if (loading) {
    return (
      <div className="pt-24 p-6 min-h-screen bg-base-200 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="pt-10 p-6 min-h-screen bg-base-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel de Control de Usuarios
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenido, {authUser?.fullName} ({authUser?.role})
        </p>
      </div>

      {/* Estadísticas */}
      <UserStats users={users} authUser={authUser} />

      {/* Barra de búsqueda */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchUsers}
      />

      {/* Tabla de usuarios */}
      <UsersTable
        filteredUsers={filteredUsers}
        authUser={authUser}
        updating={updating}
        onEdit={handleEditUser}
        onBlock={handleBlockUser}
        onDelete={handleDeleteUser}
        isOtherAdmin={isOtherAdmin}
      />

      {/* Modal de permisos */}
      <PermissionsModal
        showModal={showModal}
        selectedUser={selectedUser}
        updating={updating}
        onClose={handleCloseModal}
        onTogglePermission={togglePermission}
        onSavePermissions={handleSavePermissions}
      />
    </div>
  );
};

export default Con_Usuarios;

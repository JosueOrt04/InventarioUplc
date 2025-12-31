const PermissionsModal = ({
  showModal,
  selectedUser,
  updating,
  onClose,
  onTogglePermission,
  onSavePermissions,
}) => {
  if (!showModal || !selectedUser) return null;

  // Verificar si el usuario seleccionado es administrador
  const isAdmin =
    selectedUser.PermisosEx?.isAdmin === true || selectedUser.role === "admin";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          Editar Permisos - {selectedUser.fullName}
        </h3>

        {/* Mostrar advertencia si es administrador */}
        {isAdmin && (
          <div className="alert alert-warning mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>
              Este usuario es administrador. Los permisos de administrador
              tienen acceso completo.
            </span>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4">
          N° Control:{" "}
          <span className="font-mono">{selectedUser.controlNumber}</span>
        </p>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Permiso de Lectura</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={selectedUser.PermisosEx.lectura}
                onChange={() => onTogglePermission("lectura")}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Permiso de Registro</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={selectedUser.PermisosEx.registro}
                onChange={() => onTogglePermission("registro")}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Permiso de Modificación</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={selectedUser.PermisosEx.modificacion}
                onChange={() => onTogglePermission("modificacion")}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Permiso de Eliminación</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={selectedUser.PermisosEx.eliminacion}
                onChange={() => onTogglePermission("eliminacion")}
              />
            </label>
          </div>

        </div>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={updating}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSavePermissions(selectedUser.PermisosEx)}
            disabled={updating}
          >
            {updating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsModal;

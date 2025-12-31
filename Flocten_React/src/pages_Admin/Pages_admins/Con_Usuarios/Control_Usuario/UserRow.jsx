const UserRow = ({ user, authUser, updating, onEdit, onBlock, onDelete }) => {
  // Determinar si el usuario es administrador
  const isAdmin = user.PermisosEx?.isAdmin === true || user.role === "admin";

  // Determinar si es el usuario actual
  const isCurrentUser = user._id === authUser?._id;

  // Determinar si es otro administrador (no el actual)
  const isOtherAdmin = isAdmin && !isCurrentUser;

  return (
    <tr>
      <td className="font-mono">{user.controlNumber}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{user.fullName}</div>
            <div className="text-sm opacity-50">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span
          className={`badge ${isAdmin ? "badge-secondary" : "badge-ghost"}`}
        >
          {isAdmin ? "Administrador" : "Usuario"}
        </span>
      </td>
      <td>
        <span
          className={`badge ${user.blocked ? "badge-error" : "badge-success"}`}
        >
          {user.blocked ? "Bloqueado" : "Activo"}
        </span>
      </td>
      <td>
        <div className="flex gap-1 flex-wrap">
          {user.PermisosEx?.lectura && (
            <span className="badge badge-info badge-xs">Lectura</span>
          )}
          {user.PermisosEx?.registro && (
            <span className="badge badge-success badge-xs">Registro</span>
          )}
          {user.PermisosEx?.modificacion && (
            <span className="badge badge-warning badge-xs">Modificación</span>
          )}
          {user.PermisosEx?.eliminacion && (
            <span className="badge badge-error badge-xs">Eliminación</span>
          )}
          {isAdmin && (
            <span className="badge badge-secondary badge-xs">Admin</span>
          )}
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          {/* Botón Editar - Deshabilitado para otros administradores */}
          <button
            className={`btn btn-xs btn-outline btn-info ${
              isOtherAdmin ? "btn-disabled" : ""
            }`}
            onClick={() => onEdit(user)}
            disabled={updating || isOtherAdmin}
            title={
              isOtherAdmin
                ? "No puedes editar otros administradores"
                : "Editar permisos"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          {/* Botón Bloquear/Desbloquear - Deshabilitado para otros administradores */}
          <button
            className={`btn btn-xs btn-outline ${
              user.blocked ? "btn-success" : "btn-warning"
            } ${isOtherAdmin ? "btn-disabled" : ""}`}
            onClick={() => onBlock(user)}
            disabled={updating || isOtherAdmin}
            title={
              isOtherAdmin
                ? "No puedes bloquear otros administradores"
                : user.blocked
                ? "Desbloquear"
                : "Bloquear"
            }
          >
            {user.blocked ? "🔓" : "🔒"}
          </button>

          {/* Botón Eliminar - Deshabilitado para otros administradores */}
          <button
            className={`btn btn-xs btn-outline btn-error ${
              isOtherAdmin ? "btn-disabled" : ""
            }`}
            onClick={() => onDelete(user._id)}
            disabled={updating || isOtherAdmin}
            title={
              isOtherAdmin
                ? "No puedes eliminar otros administradores"
                : "Eliminar usuario"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;

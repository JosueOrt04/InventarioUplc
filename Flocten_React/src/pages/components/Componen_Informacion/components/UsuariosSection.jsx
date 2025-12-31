const UsuariosSection = ({ usuarios }) => {
  if (!usuarios.length) {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No hay usuarios registrados
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          No se encontraron usuarios en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {usuarios.map((usuario, index) => (
        <UsuarioItem
          key={`usuario-${usuario._id || usuario.controlNumber}`}
          usuario={usuario}
          index={index}
        />
      ))}
    </div>
  );
};

const UsuarioItem = ({ usuario, index }) => (
  <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg">
    <input type="radio" name="usuario-accordion" defaultChecked={index === 0} />
    <div className="collapse-title font-medium p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4 ">
          {usuario.profilePic ? (
            <img
              src={usuario.profilePic}
              alt={usuario.fullName}
              className="w-12 h-12 object-cover rounded-full border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200">
              <svg
                className="w-6 h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-secondary-content">{usuario.fullName}</h3>


            {/* 👇 AÑADIDO: Mostrar la fecha de creación formateada */}
            {usuario.createdAt && (
              <p className="text-xs text-gray-500 mt-1">
                {/* Formatea la fecha a un formato local (ej. 22/10/2025) */}
                Miembro desde:{" "}
                {new Date(usuario.createdAt).toLocaleDateString("es-MX")}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* 👇 MODIFICADO: Mostrar el rol del usuario dinámicamente */}
          {usuario.role && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                usuario.role === "admin"
                  ? "bg-sky-100 text-sky-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {/* Capitaliza la primera letra del rol para mejor presentación */}
              {usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="collapse-content">
  
    </div>
  </div>
);

export default UsuariosSection;

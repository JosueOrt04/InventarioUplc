const UserStats = ({ users, authUser }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Total Usuarios</div>
        <div className="stat-value text-primary">{users.length}</div>
      </div>
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Administradores</div>
        <div className="stat-value text-secondary">
          {users.filter((u) => u.role === "admin").length}
        </div>
      </div>
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Usuarios Activos</div>
        <div className="stat-value text-accent">
          {users.filter((u) => !u.blocked).length}
        </div>
      </div>
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Con Permisos</div>
        <div className="stat-value">
          {
            users.filter(
              (u) => u.PermisosEx.registro || u.PermisosEx.modificacion
            ).length
          }
        </div>
      </div>
    </div>
  );
};

export default UserStats;

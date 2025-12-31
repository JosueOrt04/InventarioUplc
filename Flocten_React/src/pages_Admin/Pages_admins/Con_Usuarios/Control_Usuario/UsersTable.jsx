import UserRow from "./UserRow";

const UsersTable = ({ 
  filteredUsers, 
  authUser, 
  updating, 
  onEdit, 
  onBlock,
   isOtherAdmin, 
  onDelete 
}) => {
  return (
    <div className="bg-base-100 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>N° Control</th>
              <th>Nombre Completo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                authUser={authUser}
                updating={updating}
                onEdit={onEdit}
                onBlock={onBlock}
                onDelete={onDelete}
                isOtherAdmin={isOtherAdmin}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
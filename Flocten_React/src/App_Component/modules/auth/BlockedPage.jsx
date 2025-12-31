// pages/BlockedPage.jsx
export const BlockedPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(false); // No mostrar toast
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Cuenta Bloqueada
        </h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido bloqueada por un administrador. 
          Si crees que esto es un error, contacta al soporte técnico.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
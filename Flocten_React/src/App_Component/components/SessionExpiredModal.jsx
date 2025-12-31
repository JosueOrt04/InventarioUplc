import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const SessionExpiredModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

  useEffect(() => {
    // Escuchar el evento de token expirado
    const handleTokenExpired = () => {
      setIsOpen(true);
     
    };

    window.addEventListener("tokenExpired", handleTokenExpired);

    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, []);

  const handleLogout = async () => {
    await logout(false); // No mostrar toast adicional
    setIsOpen(false);

    // Redirigir al login
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg max-w-md shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Sesión Expirada
        </h3>
        <p className="mb-6">
          Tu sesión ha expirado por seguridad. Por favor, vuelve a iniciar
          sesión.
        </p>
        <div className="flex gap-2 justify-end">
          <button onClick={handleLogout} className="btn btn-primary">
            Ir al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;

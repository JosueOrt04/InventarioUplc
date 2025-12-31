// src/pages/Home_Admin.jsx

import { useAuthStore } from "../store/useAuthStore";


const Home_Admin = () => {
  const { authUser } = useAuthStore();

  return (
    
    <div className="min-h-screen bg-base-100 p-6 pt-18">
    
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Panel de Administración
          </h1>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Bienvenido, Administrador {authUser?.fullName}
          </h2>
          <p className="text-lg">
            Número de control: {authUser?.controlNumber}
          </p>
          <p className="text-lg text-primary font-semibold">
            Rol: {authUser?.role}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary text-primary-content p-4 rounded-lg">
              <h3 className="text-lg font-semibold">
                Funciones de Administrador
              </h3>
              <ul className="mt-2 space-y-2">
                <li>✅ Gestión de Reservas</li>
                <li>✅ Configuración del sistema</li>
                <li>✅ Reportes y estadísticas</li>
                <li>✅ Administración de permisos</li>
              </ul>
            </div>

            <div className="bg-secondary text-secondary-content p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Tus permisos:</h3>
              <ul className="mt-2 space-y-2">
                <li>Lectura: ✅ (Completo)</li>
                <li>Registro: ✅ (Completo)</li>
                <li>Modificación: ✅ (Completo)</li>
                <li>Eliminación: ✅ (Completo)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Admin;

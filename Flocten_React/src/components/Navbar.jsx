import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, User, LogOut, PanelLeftClose, Home } from "lucide-react";
import Logp from "../public/img/LaBoritiLog.png";

const Navbar = () => {
  const { logout, authUser, menu, authChecked } = useAuthStore();

  if (!authChecked) {
    return (
      <header className="fixed py-1 min-w-full top-0 z-40 bg-base-100/60 backdrop-blur-xl border-b border-base-300 shadow-lg">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4">
          <div className="skeleton h-10 w-40"></div>
          <div className="skeleton h-10 w-24"></div>
        </div>
      </header>
    );
  }

  if (!authUser) {
    return (
      <header className="fixed py-1 min-w-full top-0 z-40 bg-base-100/60 backdrop-blur-xl border-b border-base-300 shadow-lg">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center shadow-md">
              <img
                src={Logp}
                className="w-6 h-6 filter brightness-0 invert"
                alt="Logo"
              />
            </div>
            <h1 className="text-xl font-bold text-base-content">Uplc</h1>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed py-1 min-w-full top-0 z-40 bg-base-100/60 backdrop-blur-xl border-b border-base-300 shadow-lg">
      <div className="relative inset-0 mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo y Marca */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <img
                  src={Logp}
                  className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert"
                  alt="Logo Uplc"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold text-base-content font-sans tracking-tight bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                  UPLC
                </h1>
                <span className="text-xs text-base-content/70 hidden sm:block font-medium">
                  Gestión de Reservas
                </span>
              </div>
            </Link>
          </div>

          {/* Acciones de Usuario */}
          <div className="flex items-center gap-1 sm:gap-2">
            {authUser && (
              <>
                <Link
                  to="/settings"
                  className="btn btn-ghost btn-sm sm:btn-md gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 min-h-[44px] group rounded-xl"
                  title="Configuración"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-medium">
                    Configuración
                  </span>
                </Link>

                <Link
                  to="/profile"
                  className="btn btn-ghost btn-sm sm:btn-md gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 min-h-[44px] group rounded-xl"
                  title="Perfil"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-medium">Perfil</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-ghost btn-sm sm:btn-md gap-2 hover:bg-error/10 hover:text-error transition-all duration-200 min-h-[44px] group rounded-xl"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-medium">Salir</span>
                </button>

                {/* Menú Móvil - Drawer */}
                <div className="drawer drawer-end">
                  <input
                    id="nav-menu-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />

                  {/* Disparador del Drawer */}
                  <div className="flex items-center">
                    <label
                      htmlFor="nav-menu-drawer"
                      className="btn btn-ghost btn-sm sm:btn-md gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 min-h-[44px] group drawer-button cursor-pointer rounded-xl shadow-sm hover:shadow-md active:scale-95"
                      title="Menú"
                    >
                      <PanelLeftClose className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline font-medium">Menú</span>
                    </label>
                  </div>

                  {/* Contenido del Drawer */}
                  <div className="drawer-side z-50">
                    <label
                      htmlFor="nav-menu-drawer"
                      aria-label="cerrar menú"
                      className="drawer-overlay"
                    ></label>

                    <div className="bg-base-100/80 backdrop-blur-xl min-h-full w-80 max-h-screen flex flex-col border-l border-base-300 shadow-2xl overflow-hidden">
                      {/* Encabezado del Drawer */}
                      <div className="flex items-center gap-3 p-6 pb-4 border-b border-base-300">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center shadow-lg">
                          <img
                            src={Logp}
                            className="w-6 h-6 filter brightness-0 invert"
                            alt="Logo"
                          />
                        </div>
                        <div>
                          <h2 className="font-bold text-lg text-base-content">
                            Menú
                          </h2>
                          <p className="text-sm text-base-content/60">
                            Acceso rápido
                          </p>
                        </div>
                      </div>

                      {/* Scrollable Menu */}
                      <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
                        {menu.map((data) => (
                          <Link
                            key={data.id}
                            to={data.Link}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group border border-transparent hover:border-primary/20"
                            onClick={() => {
                              const drawer =
                                document.getElementById("nav-menu-drawer");
                              if (drawer) drawer.checked = false;
                            }}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                            <span className="font-medium text-base-content group-hover:translate-x-2 transition-transform duration-200">
                              {data.name}
                            </span>
                          </Link>
                        ))}
                      </nav>

                      {/* Pie del Drawer */}
                      <div className="p-6 border-t border-base-300">
                        <div className="p-4 bg-gradient-to-r from-base-200 to-base-300 rounded-xl border border-base-300">
                          <p className="text-sm text-base-content/70 text-center font-medium">
                            Uplc v1.0
                          </p>
                          <p className="text-xs text-base-content/50 text-center mt-1">
                            Sistema de Gestión
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

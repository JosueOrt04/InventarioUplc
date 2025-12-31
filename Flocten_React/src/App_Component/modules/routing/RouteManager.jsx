import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Importaciones de páginas
import Home_Page from "../../../pages/Home_Page";
import SigUp_Admin from "../../../pages_Admin/SigUp_Admin";
import SignUpPage from "../../../pages/SignUpPage";
import LoginPage from "../../../pages/LoginPage";
import SettingsPage from "../../../pages/SettingsPage";
import ProfilePage from "../../../pages/ProfilePage";
import TC_Y_PP_A from "../../../pages/Componente_Acceso/sign_Login/TC_Y_PP_A.jsx";

import ReagentDetailPage from "../../../pages/P_Multi_Opcines/RegistroQuimico";
import Re_Laboratorio from "../../../pages/P_Multi_Opcines/Re_Laboratorio.jsx";
import Inf_Readaptivos from "../../../pages/P_Multi_Opcines/Inf_Readaptivos";
import Formulario_Reactivos from "../../../pages/components/Componen_Quimico/Componente_Reactivos/Formulario_Reactivos";
import Formulario_Material from "../../../pages/components/Componen_Quimico/Componente_Material/Formulario_Material";
import Home_Admin from "../../../pages_Admin/Home_Admin";

// Componentes comunes
import AnimatedPage from "../../../components/AnimatedPage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import NotFound from "../../components/common/NotFound";
import RouteGuard from "../../components/common/RouteGuard";

// Importaciones de rutas Admin
import Con_Usuarios from "../../../pages_Admin/Pages_admins/Con_Usuarios/Con_Usuarios";
import Con_MR from "../../../pages_Admin/Pages_admins/Con_M_R/Con_MR";
import Con_Administrador from "../../../pages_Admin/Pages_admins/Con_Administrador/Con_Administrador.jsx";
import TC_Y_PP from "../../../pages_Admin/SigUp_inicio/TC_Y_PP.jsx";
// Hooks y config
import { ROUTES } from "./routesConfig";
import { RoleBasedRedirect } from "../auth/AuthManager";

export const RouteManager = ({ authUser, isCheckingAuth }) => {
  const location = useLocation();

  if (isCheckingAuth && !authUser) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Ruta raíz */}
        <Route path="/" element={<RoleBasedRedirect authUser={authUser} />} />

        {/*Politicas de uso alumno*/}
        <Route
          path={ROUTES.PUBLIC.TC_Y_PP_A}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={[]}
              redirectTo={
                authUser?.role === "admin"
                  ? ROUTES.PROTECTED.ADMIN_HOME
                  : ROUTES.PROTECTED.HOME
              }
            >
              <AnimatedPage>
                <TC_Y_PP_A />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        {/*Politicas de uso*/}
        <Route
          path={ROUTES.PUBLIC.TC_Y_PP}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={[]} // Solo usuarios no autenticados
              redirectTo={
                authUser?.role === "admin"
                  ? ROUTES.PROTECTED.ADMIN_HOME
                  : ROUTES.PROTECTED.HOME
              }
            >
              <AnimatedPage>
                <TC_Y_PP />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        {/* Rutas públicas */}
        <Route
          path={ROUTES.PUBLIC.ADMIN_SIGNUP}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={[]} // Solo usuarios no autenticados
              redirectTo={
                authUser?.role === "admin"
                  ? ROUTES.PROTECTED.ADMIN_HOME
                  : ROUTES.PROTECTED.HOME
              }
            >
              <AnimatedPage>
                <SigUp_Admin />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.PUBLIC.SIGNUP}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={[]}
              redirectTo={
                authUser?.role === "admin"
                  ? ROUTES.PROTECTED.ADMIN_HOME
                  : ROUTES.PROTECTED.HOME
              }
            >
              <AnimatedPage>
                <SignUpPage />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.PUBLIC.LOGIN}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={[]}
              redirectTo={
                authUser?.role === "admin"
                  ? ROUTES.PROTECTED.ADMIN_HOME
                  : ROUTES.PROTECTED.HOME
              }
            >
              <AnimatedPage>
                <LoginPage />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        {/* Rutas protegidas - Usuarios normales */}
        <Route
          path={ROUTES.PROTECTED.HOME}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={["user"]}
              redirectTo={ROUTES.PUBLIC.LOGIN}
            >
              <AnimatedPage>
                <Home_Page />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        {/* Rutas protegidas - Administradores */}
        <Route
          path={ROUTES.PROTECTED.ADMIN_HOME}
          element={
            <RouteGuard
              authUser={authUser}
              allowedRoles={["admin"]}
              redirectTo={ROUTES.PROTECTED.HOME}
            >
              <AnimatedPage>
                <Home_Admin />
              </AnimatedPage>
            </RouteGuard>
          }
        />

        {/* Rutas protegidas - Control usuarios */}

        {/* Rutas protegidas para todos los usuarios autenticados */}
        {[
          ROUTES.PROTECTED.SETTINGS,
          ROUTES.PROTECTED.PROFILE,
          ROUTES.PROTECTED.INFO_REACTIVOS,
          ROUTES.PROTECTED.LABORATORIO,
          ROUTES.PROTECTED.REGISTRO_QUIMICO,

          ROUTES.PROTECTED.FORMULARIO_REACTIVOS,
          ROUTES.PROTECTED.FORMULARIO_MATERIAL,

          // Rutas de administradores
          ROUTES.PROTECTED.ADMIN_CON_USUARIOS,
          ROUTES.PROTECTED.ADMIN_CON_MR,
          ROUTES.PROTECTED.ADMIN_CON_ADMINISTRADOR,
        ].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteGuard
                authUser={authUser}
                allowedRoles={["user", "admin"]}
                redirectTo={ROUTES.PUBLIC.LOGIN}
              >
                <AnimatedPage>
                  <RouteContent path={path} />
                </AnimatedPage>
              </RouteGuard>
            }
          />
        ))}

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// Componente helper para renderizar el contenido basado en la ruta
const RouteContent = ({ path }) => {
  const routeComponents = {
    [ROUTES.PROTECTED.SETTINGS]: <SettingsPage />,
    [ROUTES.PROTECTED.PROFILE]: <ProfilePage />,
    [ROUTES.PROTECTED.INFO_REACTIVOS]: <Inf_Readaptivos />,
    [ROUTES.PROTECTED.LABORATORIO]: <Re_Laboratorio />,
    [ROUTES.PROTECTED.REGISTRO_QUIMICO]: <ReagentDetailPage />,

    [ROUTES.PROTECTED.FORMULARIO_REACTIVOS]: <Formulario_Reactivos />,
    [ROUTES.PROTECTED.FORMULARIO_MATERIAL]: <Formulario_Material />,

    // Rutas de administradores
    [ROUTES.PROTECTED.ADMIN_CON_USUARIOS]: <Con_Usuarios />,
    [ROUTES.PROTECTED.ADMIN_CON_MR]: <Con_MR />,
    [ROUTES.PROTECTED.ADMIN_CON_ADMINISTRADOR]: <Con_Administrador />,
  };

  return routeComponents[path] || <NotFound />;
};

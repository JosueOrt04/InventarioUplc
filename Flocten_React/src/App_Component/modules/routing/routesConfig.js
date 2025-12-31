// Configuración centralizada de rutas
export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    ADMIN_SIGNUP: "/admin",
    TC_Y_PP: "/Politecas_de_usos",
    TC_Y_PP_A: "/Politecas_de_usos_A",

  },
  PROTECTED: {
    HOME: "/home",
    SETTINGS: "/settings",
    PROFILE: "/profile",
    INFO_REACTIVOS: "/InformacionReactivos",
    LABORATORIO: "/Re_Laboratorio",
    REGISTRO_QUIMICO: "/RegistroQuimico",
    REGISTRO_GENERAL: "/Registro_General",
    FORMULARIO_REACTIVOS: "/Formulario_Reactivos",
    FORMULARIO_MATERIAL: "/Formulario_Material",
    ADMIN_HOME: "/home-admin",

    /* Rutas de admin */
    ADMIN_CON_USUARIOS: "/Control-Usuarios",
    ADMIN_CON_MR: "/Control-MR",
    ADMIN_CON_ADMINISTRADOR: "/Control-Administrador",
  },
};

export const routeTitles = {
  "/": "Home - Uplc",
  "/home": "Home - Uplc",
  "/home-admin": "Admin Panel - Uplc",
  "/signup": "Sign Up - Uplc",
  "/admin": "Admin - Uplc",
  "/login": "Login - Uplc",
  "/settings": "Settings - Uplc",
  "/profile": "Profile - Uplc",
  "/Informa": "Información - Uplc",
  "/Politecas_de_usos": "Politicas - Uplc",
  "/Politecas_de_usos_A": "Politicas usuario - Uplc",
};

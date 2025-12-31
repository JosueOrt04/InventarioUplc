export const initialMenu = [
  { id: 1, name: "Informacion", Link: "/", roles: ["user", "admin"] },
  {
    id: 2,
    name: "Almacen",
    Link: "/RegistroQuimico",
    roles: ["user"],
  },
  {
    id: 3,
    name: "Registro",
    Link: "/Re_Laboratorio",
    roles: ["user"],
  },
];

export const initialMenu_Admin = [
  {
    id: 4,
    name: "Con_Administrativos",
    Link: "/Control-Administrador",
    roles: ["admin"],
  },
  /*
  
  {
    id: 5,
    name: "Control_Usuarios",
    Link: "/Control-Usuarios",
    roles: ["admin"],
  },
  {
    id: 6,
    name: "Control de Inventarios",
    Link: "/Control-MR",
    roles: ["admin"],
  },
  {
    id: 7,
    name: "Almacenes",
    Link: "/RegistroQuimico",
    roles: ["admin"],
  },
    {
    id: 8,
    name: "Registro",
    Link: "/Re_Laboratorio",
    roles: ["admin"],
  },
    {
    id: 9,
    name: "Informacion general",
    Link: "/InformacionReactivos",
    roles: ["admin"],
  },
  */
];

// Función para obtener menú basado en rol
export const getMenuByRole = (role) => {
  const allMenuItems = [...initialMenu, ...initialMenu_Admin];
  return allMenuItems.filter((item) => item.roles && item.roles.includes(role));
};

export const defaultPermissions = {
  lectura: false,
  registro: false,
  modificacion: false,
  eliminacion: false,
};

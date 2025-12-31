import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";
import { defaultPermissions } from "./types.js";

export const createAuthSlice = (set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  authChecked: false,

  // Función para actualizar el menú cuando cambia el usuario
  updateUserMenu: (userData) => {
    const { updateMenuByRole } = get();
    if (userData && userData.role) {
      updateMenuByRole(userData.role);
    }
  },

  // Helpers de permisos
  hasPermission: (permission) => {
    const { authUser } = get();
    if (!authUser) return false;
    if (authUser.role === "admin") return true;
    return authUser.PermisosEx?.[permission] || false;
  },

  isAdmin: () => {
    const { authUser } = get();
    return authUser?.role === "admin";
  },

  // Inicialización de autenticación CORREGIDA
  initializeAuth: async () => {
    const savedUser = localStorage.getItem("authUser");
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        set({ authUser: userData });
        get().updateUserMenu(userData);
        
        // Verificar si el token sigue siendo válido
        await get().checkAuth();
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("authUser");
        set({ authUser: null, authChecked: true });
      }
    } else {
      await get().checkAuth();
    }
  },

  // CheckAuth CORREGIDO
// En auth-slice.js - MODIFICA la función checkAuth
checkAuth: async () => {
  if (get().isCheckingAuth) return;

  set({ isCheckingAuth: true });

  try {
    const res = await axiosInstance.get("/auth/check");

    if (res.status === 200) {
      // DEBUG: Ver estructura de check
      console.log("🔍 CHECK AUTH RESPONSE:", res.data);

      let token = null;
      
      // Buscar token en la respuesta
      if (res.data.token) token = res.data.token;
      else if (res.data.accessToken) token = res.data.accessToken;

      const userData = {
        ...res.data,
        role: res.data.role || "user",
        PermisosEx: res.data.PermisosEx || defaultPermissions,
        // AGREGAR TOKEN
        token: token,
      };

      set({ 
        authUser: userData, 
        authChecked: true 
      });
      
      localStorage.setItem("authUser", JSON.stringify(userData));
      
      // Guardar token por separado
      if (token) {
        localStorage.setItem('token', userData.token);
      }
      
      get().updateUserMenu(userData);
      get().connectSocket();
    }
  } catch (apiError) {
    console.error("Check auth error:", apiError);
    
    if (apiError.response?.status === 401) {
      await get().logout(false);
      toast.error("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    } else {
      // Mantener usuario local si existe
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          set({ 
            authUser: userData, 
            authChecked: true 
          });
          get().updateMenuByRole(userData.role);
        } catch (e) {
          localStorage.removeItem("authUser");
          set({ authUser: null, authChecked: true });
        }
      } else {
        set({ authUser: null, authChecked: true });
      }
    }
  } finally {
    set({ isCheckingAuth: false });
  }
},

  // Login (sin cambios)
// En auth-slice.js - MODIFICA la función login
login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    
    // DEBUG: Ver la estructura real de la respuesta
    console.log("🔍 LOGIN RESPONSE:", {
      fullResponse: res.data,
      hasTokenField: 'token' in res.data,
      hasAccessTokenField: 'accessToken' in res.data,
      keys: Object.keys(res.data)
    });

    // EXTRAER EL TOKEN - DEPENDE DE TU API
    let token = null;
    
    // Opción 1: Token viene directamente en la respuesta
    if (res.data.token) {
      token = res.data.token;
    } 
    // Opción 2: Token viene como accessToken
    else if (res.data.accessToken) {
      token = res.data.accessToken;
    }
    // Opción 3: Token viene en un objeto anidado
    else if (res.data.data?.token) {
      token = res.data.data.token;
    }

    console.log("✅ Token extraído:", token ? "SÍ" : "NO");

    // Crear objeto usuario CON EL TOKEN
    const userData = {
      ...res.data,
      role: res.data.role || "user",
      PermisosEx: res.data.PermisosEx || defaultPermissions,
      // AGREGAR EL TOKEN AL OBJETO USUARIO
      token: token,
    };

    set({ authUser: userData });
    localStorage.setItem("authUser", JSON.stringify(userData));
    
    // También guardar el token por separado para fácil acceso
    if (token) {
     localStorage.setItem('token', userData.token);
    }
    
    get().updateUserMenu(userData);
    toast.success("Logged in successfully");
    get().connectSocket();

  } catch (error) {
    toast.error(error.response?.data?.message || "Error al iniciar sesión");
  } finally {
    set({ isLoggingIn: false });
  }
},

  // Registro (sin cambios)
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      const userData = {
        ...res.data,
        role: res.data.role || "user",
        PermisosEx: res.data.PermisosEx || defaultPermissions,
      };

      set({ authUser: userData });
      localStorage.setItem("authUser", JSON.stringify(userData));
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en registro");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Logout CORREGIDO
  logout: async (showToast = true) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      set({ 
        authUser: null, 
        authChecked: true  // ← Asegurar que authChecked sea true
      });
      localStorage.removeItem("authUser");
      
      // Limpiar el menú al hacer logout
      const { updateMenuByRole } = get();
      updateMenuByRole("user");
      
      if (showToast) {
        toast.success("Logged out successfully");
      }
      get().disconnectSocket();
    }
  },

  updateProfilePicture: (profilePicUrl) => {
    const { authUser } = get();
    if (!authUser) {
      toast.error("No user found to update profile picture");
      return;
    }

    const updatedUser = {
      ...authUser,
      profilePic: profilePicUrl,
    };

    set({ authUser: updatedUser });
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
    toast.success("Profile picture updated successfully");
  },
});
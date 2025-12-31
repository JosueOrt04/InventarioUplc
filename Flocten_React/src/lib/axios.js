// lib/axios.js
import axios from "axios";

// Configuración base URL más robusta
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (import.meta.env.MODE === 'development') {
    return "http://localhost:5001/api";
  }
  
  return `${window.location.origin}/api`;
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor para requests - CORREGIDO
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token del almacenamiento
    const authData = localStorage.getItem('authUser');
    
    if (authData) {
      try {
        const userData = JSON.parse(authData);
        // Asumimos que el token está en userData.token o userData.accessToken
        const token = userData.token || userData.accessToken;
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas con manejo de token expirado
// En lib/axios.js - INTERCEPTOR MEJORADO
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🔄 Interceptor request - URL:", config.url);
    
    // Buscar token en múltiples ubicaciones
    let token = null;
    
    // 1. Buscar token por separado
    token = localStorage.getItem('token');
    console.log("🔍 Token from localStorage 'token':", token ? "Found" : "Not found");
    
    // 2. Buscar dentro de authUser
    if (!token) {
      const authData = localStorage.getItem('authUser');
      if (authData) {
        try {
          const userData = JSON.parse(authData);
          token = userData.token || userData.accessToken;
          console.log("🔍 Token from authUser:", token ? "Found" : "Not found");
        } catch (error) {
          console.error('Error parsing auth data:', error);
        }
      }
    }
    
    // 3. Si encontramos token, agregarlo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token agregado a headers:", config.headers.Authorization);
    } else {
      console.warn("⚠️ No se encontró token de autenticación");
    }
    
    return config;
  },
  (error) => {
    console.error("Interceptor request error:", error);
    return Promise.reject(error);
  }
);
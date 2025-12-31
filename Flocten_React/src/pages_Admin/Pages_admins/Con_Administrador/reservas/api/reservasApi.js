import axios from "axios";

const API_URL =
  "http://localhost:5001/api/reservas-laboratorio";

// Configura el token JWT
const authToken = localStorage.getItem("token") || "";

const reservasApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

// Interceptor para manejo de errores
reservasApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default reservasApi;

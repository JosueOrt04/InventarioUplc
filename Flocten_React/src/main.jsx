// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

// ⬅️ Importaciones de React Query y Auth
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./pages/Componente_Acceso/Perfil_Com/Edit_compo/AuthContext.jsx"; // <- NUEVA LÍNEA

// 1. Crea la instancia del QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Datos "frescos" por 5 minutos
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* ⬅️ 2. Envuelve tu app con AuthProvider */}
        <AuthProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="bg-base-content pt-18"
          >
            <App />
          </motion.div>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

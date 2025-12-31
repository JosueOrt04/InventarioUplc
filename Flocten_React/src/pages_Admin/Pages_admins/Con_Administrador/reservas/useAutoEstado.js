// hooks/useAutoEstado.js - VERSIÓN MEJORADA
import { useVerificarEstados } from "./useReservas";
import { useEffect } from "react";

export const useAutoEstado = (enabled = true) => {
  const verificarMutation = useVerificarEstados();

  useEffect(() => {
    if (!enabled) return;



    // Verificar inmediatamente al cargar
    verificarMutation.mutate(undefined, {
      onSuccess: (data) => {

      },
      onError: (error) => {

      },
    });

    // Verificar cada minuto (puedes ajustar el intervalo)
    const interval = setInterval(() => {
    
      verificarMutation.mutate(undefined, {
        onSuccess: (data) => {
          if (
            data.iniciadas > 0 ||
            data.finalizadas > 0 ||
            data.expiradas > 0
          ) {
     
          }
        },
      });
    }, 30000); // 60 segundos

    return () => {

      clearInterval(interval);
    };
  }, [enabled, verificarMutation]);

  return verificarMutation;
};

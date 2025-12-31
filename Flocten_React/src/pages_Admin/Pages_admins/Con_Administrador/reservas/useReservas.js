// hooks/reservas/useReservas.js
/* ------------------------------------------------------------------
 *  HOOKS PERSONALIZADOS (React-Query) para el módulo de reservas
 *  Objetivo: abstraer toda la lógica de backend (axios) y devolver
 *            estados / mutaciones listas para consumir en componentes.
 * ------------------------------------------------------------------ */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useAuthStore } from "../../../../store/useAuthStore";

/* -------------------------------------------------
 *  CONFIGURACIÓN BASE
 * ------------------------------------------------- */
const RESERVAS_BASE_URL = "/reservas_laboratorio";

/* -------------------------------------------------
 *  QUERIES (LECTURA)
 * ------------------------------------------------- */

/**
 * Obtiene horarios ocupados de un laboratorio en una fecha específica
 */
export const useHorariosOcupados = (laboratorio, fecha) => {
  return useQuery({
    queryKey: ["horarios-ocupados", laboratorio, fecha],
    queryFn: async () => {
      if (!laboratorio || !fecha) return { horarios: [] };
      
      const { data } = await axiosInstance.get(
        `${RESERVAS_BASE_URL}/horarios-ocupados`,
        { params: { laboratorio, fecha } }
      );
      return data;
    },
    enabled: !!laboratorio && !!fecha,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Lista todas las reservas con filtros aplicables
 */
export const useReservas = (filters = {}) => {
  // Limpia filtros eliminando valores vacíos
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v != null)
  );

  return useQuery({
    queryKey: ["reservas", cleanFilters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(RESERVAS_BASE_URL, {
        params: { ...cleanFilters, limit: 5 },
      });
      return data;
    },
    keepPreviousData: true,
    refetchInterval: 30000, // 30 segundos
  });
};

/**
 * Obtiene una reserva específica por ID
 */
export const useReserva = (id) => {
  return useQuery({
    queryKey: ["reserva", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${RESERVAS_BASE_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

/**
 * Consulta disponibilidad de bloques en un laboratorio
 */
export const useDisponibilidad = (laboratorio, fecha) => {
  return useQuery({
    queryKey: ["disponibilidad", laboratorio, fecha],
    queryFn: async () => {
      if (!laboratorio || !fecha) throw new Error("Faltan laboratorio o fecha");
      
      const { data } = await axiosInstance.get(
        `${RESERVAS_BASE_URL}/disponibilidad/${laboratorio}/${fecha}`
      );
      return data;
    },
    enabled: !!laboratorio && !!fecha,
    retry: 2,
    staleTime: 30000, // 30 segundos
  });
};

/**
 * Genera reporte de ocupación por rango de fechas
 */
export const useReporteOcupacion = (params) => {
  return useQuery({
    queryKey: ["reporte-ocupacion", params],
    queryFn: async () => {
      if (!params?.fechaInicio || !params?.fechaFin) {
        throw new Error("Rango de fechas incompleto");
      }

      const { data } = await axiosInstance.get(
        `${RESERVAS_BASE_URL}/reporte/ocupacion`,
        {
          params: {
            ...params,
            fechaInicio: new Date(params.fechaInicio).toISOString().split("T")[0],
            fechaFin: new Date(params.fechaFin).toISOString().split("T")[0],
          },
        }
      );
      return data;
    },
    enabled: !!params?.fechaInicio && !!params?.fechaFin,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/* -------------------------------------------------
 *  MUTACIONES (ESCRITURA)
 * ------------------------------------------------- */

/**
 * Crea una nueva reserva con soporte para evidencia de imagen
 */
// En useReservas.js, modifica useCrearReserva
export const useCrearReserva = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const { data } = await axiosInstance.post(
          RESERVAS_BASE_URL,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        return data;
      } catch (error) {
        // Propaga el error con más información
        if (error.response?.status === 409) {
          error.userMessage = "El horario seleccionado ya está ocupado";
        }
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
    },
  });
};

/**
 * Actualiza cualquier campo de una reserva existente
 */
export const useActualizarReserva = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...reservaData }) => {
      const { data } = await axiosInstance.put(
        `${RESERVAS_BASE_URL}/${id}`,
        reservaData
      );
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
      qc.invalidateQueries({ queryKey: ["reserva", vars.id] });
    },
  });
};

/**
 * Cancela una reserva con razón de cancelación
 */
export const useCancelarReserva = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, razonCancelacion }) => {
      const { data } = await axiosInstance.patch(
        `${RESERVAS_BASE_URL}/${id}/cancelar`,
        { razonCancelacion }
      );
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
      qc.invalidateQueries({ queryKey: ["reserva", vars.id] });
    },
  });
};

/**
 * Marca una reserva como "en uso"
 */
export const useIniciarUso = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.patch(
        `${RESERVAS_BASE_URL}/${id}/iniciar-uso`
      );
      return data;
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
      qc.invalidateQueries({ queryKey: ["reserva", id] });
    },
  });
};

/**
 * Finaliza una reserva y guarda evidencia de imagen
 */
export const useFinalizarReserva = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await axiosInstance.patch(
        `${RESERVAS_BASE_URL}/${id}/finalizar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
      qc.invalidateQueries({ queryKey: ["reserva", vars.id] });
    },
  });
};

/**
 * Marca una reserva como notificada
 */
export const useMarcarNotificado = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.patch(
        `${RESERVAS_BASE_URL}/${id}/notificar`
      );
      return data;
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["reservas"] });
      qc.invalidateQueries({ queryKey: ["reserva", id] });
    },
  });
};

/* -------------------------------------------------
 *  HELPERS (COMPATIBILIDAD)
 * ------------------------------------------------- */

/**
 * Hook legacy - mantiene compatibilidad con versiones anteriores
 */
export const useObtenerReservas = ({ 
  laboratorio, 
  fechaReserva, 
  estado, 
  asesorId 
}) => {
  return useReservas({ laboratorio, fechaReserva, estado, asesorId });
};
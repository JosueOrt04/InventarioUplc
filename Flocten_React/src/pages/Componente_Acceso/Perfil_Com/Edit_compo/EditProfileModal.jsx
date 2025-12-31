// EditProfileModal.jsx - Versión mejorada
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../../lib/axios";
import { useAuth } from "./AuthContext";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { authUser, updateUser, refreshUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos del usuario cuando el modal se abre
  useEffect(() => {
    if (isOpen && authUser) {
      setFullName(authUser.fullName || "");
    }
  }, [isOpen, authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("❌ El nombre no puede estar vacío");
      return;
    }

    if (fullName.trim() === authUser?.fullName) {
      toast.error("❌ El nombre es el mismo");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.put("/auth/profile/name", {
        fullName: fullName.trim(),
      });

      toast.success("✅ Perfil actualizado correctamente");

      // ESTRATEGIA COMBINADA: Actualizar inmediatamente Y refrescar
      // 1. Actualización inmediata con datos del response (si existen)
      if (response.data.user) {
        updateUser(response.data.user);
      } else {
        // 2. Si no hay datos en response, forzar refresh desde servidor
        await refreshUser();
      }

      // 3. Forzar un pequeño delay para asegurar que React procese los cambios
      await new Promise((resolve) => setTimeout(resolve, 100));

      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `❌ ${error.response?.data?.message || "Error al actualizar el perfil"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="text-sm text-gray-500 mt-2">
            <p>Los cambios se verán reflejados inmediatamente.</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="btn btn-ghost flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

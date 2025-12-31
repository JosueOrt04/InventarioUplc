import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../../lib/axios";


const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("❌ Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("❌ Mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      // USA axiosInstance EN LUGAR DE fetch
      const response = await axiosInstance.put("/auth/profile/password", {
        currentPassword,
        newPassword,
      });

      toast.success("✅ Contraseña actualizada");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `❌ ${error.response?.data?.message || "Error de conexión"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contraseña actual</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nueva contraseña</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirmar nueva contraseña</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="btn btn-ghost flex-1"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

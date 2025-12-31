import { motion } from "framer-motion";
import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

const ProfileBanner = ({ authUser }) => {
  const { updateProfilePicture } = useAuthStore();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUpdatingProfile(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadRes = await axios.post(
        "http://localhost:5001/api/usuario/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = uploadRes.data.imageUrl;

      const updateRes = await axios.put(
        `http://localhost:5001/api/usuario/upload/ProfilePic/${authUser._id}`,
        { imageUrl }
      );

      if (typeof updateProfilePicture === "function") {
        const updatedUser = updateRes.data.user;
        await updateProfilePicture(updatedUser.profilePic);
      } else {
        throw new Error("Función de actualización no disponible");
      }
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="relative h-24 bg-gradient-to-r from-primary to-secondary rounded-t-2xl">
      <motion.div
        className="absolute -bottom-16 left-6"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-base-100 p-2 shadow-lg">
            {authUser?.profilePic ? (
              <img
                src={`${authUser.profilePic}?t=${new Date().getTime()}`}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Usuario&background=random";
                }}
              />
            ) : (
              <div className="skeleton w-full h-full rounded-full" />
            )}
          </div>

          <motion.div
            className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-4 border-base-100 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />

          <label
            htmlFor="avatar-upload"
            className={`
              absolute -bottom-2 -right-2 bg-primary hover:bg-primary-focus 
              p-3 rounded-full cursor-pointer shadow-lg transition-all
              ${
                isUpdatingProfile
                  ? "animate-pulse pointer-events-none"
                  : "hover:scale-110"
              }
            `}
          >
            {isUpdatingProfile ? (
              <Loader2 className="w-5 h-5 text-primary-content animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-primary-content" />
            )}
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileBanner;

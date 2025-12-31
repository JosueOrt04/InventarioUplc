import { motion } from "framer-motion";
import ProfileBanner from "./ProfileBanner";
import ProfileNotifications from "./ProfileNotifications";
import ProfileInfo from "./ProfileInfo";
import AccountInfo from "./AccountInfo";
import { fadeInVariants } from "./animationVariants";

const ProfileMainCard = ({ authUser }) => {
  return (
    <motion.div
      className="lg:col-span-2 card bg-base-100 shadow-xl"
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    >
      <ProfileBanner authUser={authUser} />

      <div className="card-body pt-24">
        <ProfileNotifications />
        <ProfileInfo authUser={authUser} />
        <AccountInfo authUser={authUser} />
      </div>
    </motion.div>
  );
};

export default ProfileMainCard;

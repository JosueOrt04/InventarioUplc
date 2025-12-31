import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header_Ractivos = ({ authUser }) => {
  const location = useLocation();

  const tabs = [
    {
      path: "/RegistroQuimico",
      label: "Registro Químico",
      icon: "M3 3h18v18H3V3zm2 2v14h14V5H5z",
    },
    {
      path: "/Formulario_Material",
      label: "Formulario Material",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      className="static top-0 z-40 bg-base-100/90 backdrop-blur-sm border-b border-base-300 shadow-sm py-1"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="navbar justify-center max-w-7xl mx-auto px-4">
        <div className="tabs tabs-boxed bg-base-200 p-1 gap-1">
          {tabs.map((tab) => (
            <motion.div
              key={tab.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={tab.path}
                className={`tab ${isActive(tab.path) ? "tab-active" : ""} ${
                  isActive(tab.path)
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300"
                }`}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={tab.icon}
                  />
                </svg>
                {tab.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Header_Ractivos;

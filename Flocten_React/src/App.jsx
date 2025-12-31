import { RouteManager } from "./App_Component/modules/routing/RouteManager";
import { useAuthManager } from "./App_Component/modules/auth/AuthManager";
import { useDocumentTitle } from "./App_Component/modules/routing/useDocumentTitle";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import SessionExpiredModal from "./App_Component/components/SessionExpiredModal";



const App = () => {
  const { authUser, isCheckingAuth } = useAuthManager();
  const { theme } = useThemeStore();

  // Manejo del título del documento
  useDocumentTitle();

  return (
    
    <div data-theme={theme} className="text-base-content">
        <SessionExpiredModal />
      <Navbar />
      <RouteManager authUser={authUser} isCheckingAuth={isCheckingAuth} />
      <Toaster />
    </div>
  );
};

export default App;

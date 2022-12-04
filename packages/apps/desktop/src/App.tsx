import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useSession } from "supabase-swr";

import { ThemeProvider } from "@encontrei/contexts/ThemeContext";
import { AppRoutes } from "@encontrei/routes/AppRoutes";
import { AuthRoutes } from "@encontrei/routes/AuthRoutes";

import "react-toastify/dist/ReactToastify.min.css";

export function App() {
  const session = useSession();

  return (
    <ThemeProvider>
      <HashRouter>
        {session ? <AppRoutes /> : <AuthRoutes />}
        <ToastContainer
          theme="dark"
          autoClose={4000}
          hideProgressBar
          position="top-right"
        />
      </HashRouter>
    </ThemeProvider>
  );
}

import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import type { User } from "@supabase/supabase-js";

import { supabase } from "@encontrei/lib/supabase";
import { AppRoutes } from "@encontrei/routes/AppRoutes";
import { AuthRoutes } from "@encontrei/routes/AuthRoutes";

import { ThemeProvider } from "./contexts/ThemeContext";

export function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(supabase.auth.session()?.user ?? null);

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        {user ? <AppRoutes /> : <AuthRoutes />}
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

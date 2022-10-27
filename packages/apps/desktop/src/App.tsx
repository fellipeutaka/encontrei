import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { User } from "@supabase/supabase-js";

import { useTheme } from "@encontrei/hooks/useTheme";
import { supabase } from "@encontrei/lib/supabase";
import AppRoutes from "@encontrei/routes/AppRoutes";
import AuthRoutes from "@encontrei/routes/AuthRoutes";

export function App() {
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(supabase.auth.session()?.user ?? null);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (data?.unsubscribe) {
        data.unsubscribe();
      }
    };
  }, []);

  return (
    <HashRouter>
      {user ? <AppRoutes /> : <AuthRoutes />}
      <ToastContainer
        theme={theme}
        autoClose={4000}
        hideProgressBar
        position="top-right"
      />
    </HashRouter>
  );
}

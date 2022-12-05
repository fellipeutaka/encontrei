import { useEffect, useState } from "react";

import { supabase } from "@encontrei/lib/supabase";

export function useSession() {
  const [session, setSession] = useState(supabase.auth.session());

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, newSession) => {
        setSession(newSession);
      }
    );
    return () => subscription?.unsubscribe();
  }, []);

  return session;
}

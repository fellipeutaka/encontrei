import { SwrSupabaseContext } from "supabase-swr";

import { supabase } from "@encontrei/lib/supabase";

type SupabaseProviderProps = {
  children: React.ReactNode;
};

export function SWRSupabaseProvider({ children }: SupabaseProviderProps) {
  return (
    <SwrSupabaseContext.Provider value={supabase}>
      {children}
    </SwrSupabaseContext.Provider>
  );
}

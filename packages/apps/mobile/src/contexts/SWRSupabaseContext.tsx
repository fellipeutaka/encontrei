import { createContext } from "react";

import { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@encontrei/lib/supabase";

const SwrSupabaseContext = createContext<SupabaseClient>(supabase);

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

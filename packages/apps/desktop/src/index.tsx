import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { SWRSupabaseProvider } from "./contexts/SWRSupabaseContext";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRSupabaseProvider>
      <App />
    </SWRSupabaseProvider>
  </StrictMode>
);

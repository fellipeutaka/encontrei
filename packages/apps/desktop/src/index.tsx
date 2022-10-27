import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@encontrei/contexts/ThemeContext";

import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

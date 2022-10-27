import { useContext } from "react";

import { ThemeContext } from "@encontrei/contexts/ThemeContext";

export function useCustomTheme() {
  return useContext(ThemeContext);
}

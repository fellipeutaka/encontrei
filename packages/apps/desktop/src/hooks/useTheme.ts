import { useContext } from "react";

import { ThemeContext } from "@encontrei/contexts/ThemeContext";

export function useTheme() {
  return useContext(ThemeContext);
}

import { createContext, ReactNode } from "react";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { GlobalStyle } from "@encontrei/styles/GlobalStyle";
import themes from "@encontrei/themes";

import { usePersistedState } from "../hooks/usePersistedState";

interface IThemeContext {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = usePersistedState<"dark" | "light">(
    "@encontrei/theme",
    "dark"
  );

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledComponentsThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}

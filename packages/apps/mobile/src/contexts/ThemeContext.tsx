import { createContext, ReactNode, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components/native";

import themes from "@encontrei/themes";

type Theme = "dark" | "light";

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => Promise<void>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  async function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      await AsyncStorage.setItem("@encontrei/theme", "light");
    } else {
      setTheme("dark");
      await AsyncStorage.setItem("@encontrei/theme", "dark");
    }
  }

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem("@encontrei/theme");

    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }

  useEffect(() => {
    void loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
      <StyledComponentsThemeProvider theme={themes[theme]}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}

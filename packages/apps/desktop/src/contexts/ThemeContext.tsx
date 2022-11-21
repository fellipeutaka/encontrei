import { createContext, ReactNode, useEffect, useState } from "react";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (
      localStorage.getItem("@encontrei/theme") === "dark" ||
      (localStorage.getItem("@encontrei/theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("@encontrei/theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("@encontrei/theme", "light");
    }
  }, []);

  function toggleTheme() {
    if (theme === "dark") {
      localStorage.setItem("@encontrei/theme", "light");
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      localStorage.setItem("@encontrei/theme", "dark");
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

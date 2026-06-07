"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ColorTheme = "orange" | "green";

interface ThemeCtx {
  colorTheme: ColorTheme;
  toggleColorTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  colorTheme: "orange",
  toggleColorTheme: () => {},
});

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("orange");

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("color-theme") as ColorTheme | null;
    if (stored === "green") {
      setColorTheme("green");
      document.documentElement.setAttribute("data-color-theme", "green");
    }
  }, []);

  const toggleColorTheme = () => {
    setColorTheme(prev => {
      const next = prev === "orange" ? "green" : "orange";
      localStorage.setItem("color-theme", next);
      document.documentElement.setAttribute("data-color-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ThemeContext);
}

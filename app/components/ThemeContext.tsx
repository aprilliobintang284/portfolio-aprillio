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
    const html = document.documentElement;
    // Start smooth transition
    html.classList.add("theme-transitioning");
    setColorTheme(prev => {
      const next = prev === "orange" ? "green" : "orange";
      localStorage.setItem("color-theme", next);
      if (next === "green") {
        html.setAttribute("data-color-theme", "green");
      } else {
        html.removeAttribute("data-color-theme");
      }
      return next;
    });
    // Remove transition class after animation completes
    setTimeout(() => html.classList.remove("theme-transitioning"), 650);
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

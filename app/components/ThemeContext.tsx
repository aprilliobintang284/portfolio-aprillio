"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ColorTheme = "blue" | "green";

interface ThemeCtx {
  colorTheme: ColorTheme;
  toggleColorTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  colorTheme: "blue",
  toggleColorTheme: () => {},
});

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("color-theme") as ColorTheme | null;
    if (stored === "green") {
      setColorTheme("green");
      document.documentElement.setAttribute("data-color-theme", "green");
    } else {
      // Ensure we're in blue mode (clear any old 'orange' value)
      localStorage.setItem("color-theme", "blue");
    }
  }, []);

  const toggleColorTheme = () => {
    const html = document.documentElement;
    // Start smooth transition
    html.classList.add("theme-transitioning");
    setColorTheme(prev => {
      const next = prev === "blue" ? "green" : "blue";
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

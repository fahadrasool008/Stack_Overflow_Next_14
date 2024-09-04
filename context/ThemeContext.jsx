"use client";
import React, { useContext, createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("");
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem("theme") || "system";
      return storedItem;
    }
  });

  const changeTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    changeTheme();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, active, setActive, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

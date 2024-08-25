"use client";
import React, { useContext, createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("");

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
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

/*
(prev) => {
    if (typeof window !== "undefined") {
      const storedTheme =
        localStorage.getItem("theme") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      return storedTheme;
    }
  }
    */

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeColor = "default" | "blue" | "green" | "purple" | "orange" | "rose";

interface ThemeColorContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(
  undefined
);

export function ThemeColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem(
      "chat-theme-color"
    ) as ThemeColor | null;
    if (savedColor) {
      setThemeColorState(savedColor);
      document.documentElement.setAttribute(
        "data-theme-color",
        savedColor
      );
    }
    setMounted(true);
  }, []);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem("chat-theme-color", color);
    document.documentElement.setAttribute("data-theme-color", color);
  };

  if (!mounted) {
    return children;
  }

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error("useThemeColor must be used within ThemeColorProvider");
  }
  return context;
}

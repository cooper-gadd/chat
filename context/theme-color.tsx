"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeColor } from "@/db/schema";

interface ThemeColorContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(
  undefined
);

export const THEME_COLORS: { value: ThemeColor; label: string; color: string }[] = [
  { value: "default", label: "Default", color: "oklch(0.205 0 0)" },
  { value: "blue", label: "Blue", color: "oklch(0.546 0.245 262.881)" },
  { value: "green", label: "Green", color: "oklch(0.527 0.154 150.069)" },
  { value: "purple", label: "Purple", color: "oklch(0.558 0.288 302.321)" },
  { value: "orange", label: "Orange", color: "oklch(0.646 0.222 41.116)" },
  { value: "rose", label: "Rose", color: "oklch(0.585 0.233 3.958)" },
];

function applyThemeColorClass(color: ThemeColor) {
  const html = document.documentElement;
  // Remove all theme classes
  THEME_COLORS.forEach((theme) => {
    if (theme.value !== "default") {
      html.classList.remove(`theme-${theme.value}`);
    }
  });
  // Add the new theme class if not default
  if (color !== "default") {
    html.classList.add(`theme-${color}`);
  }
}

export function ThemeColorProvider({
  children,
  initialThemeColor = "default",
}: {
  children: ReactNode;
  initialThemeColor?: ThemeColor;
}) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(initialThemeColor);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    applyThemeColorClass(color);
  };

  useEffect(() => {
    applyThemeColorClass(themeColor);
  }, [themeColor]);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (!context) throw new Error("useThemeColor must be within ThemeColorProvider");
  return context;
}

"use client";

import { useEffect, useState } from "react";

export type ColorTheme = "default" | "ocean" | "aurora" | "forest";

const THEME_STORAGE_KEY = "chat-color-theme";
const DEFAULT_THEME: ColorTheme = "default";

export function useColorTheme() {
  const [theme, setTheme] = useState<ColorTheme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ColorTheme | null;
    if (stored && isValidTheme(stored)) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme(DEFAULT_THEME);
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  const changeTheme = (newTheme: ColorTheme) => {
    if (isValidTheme(newTheme)) {
      setTheme(newTheme);
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  };

  return { theme, changeTheme, mounted };
}

function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;

  // Remove all theme classes
  root.classList.remove("theme-default", "theme-ocean", "theme-aurora", "theme-forest");

  // Add new theme class if not default
  if (theme !== "default") {
    root.classList.add(`theme-${theme}`);
  }
}

function isValidTheme(theme: unknown): theme is ColorTheme {
  return ["default", "ocean", "aurora", "forest"].includes(theme as string);
}

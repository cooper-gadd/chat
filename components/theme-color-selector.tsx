"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

const THEME_COLORS = [
  { name: "Default", value: "default" },
  { name: "Blue", value: "blue" },
  { name: "Purple", value: "purple" },
  { name: "Green", value: "green" },
  { name: "Orange", value: "orange" },
  { name: "Red", value: "red" },
] as const;

export function ThemeColorSelector() {
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("chat-theme-color") || "default";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const html = document.documentElement;

    // Remove all theme classes
    THEME_COLORS.forEach(({ value }) => {
      html.classList.remove(`theme-${value}`);
    });

    // Apply selected theme
    if (theme !== "default") {
      html.classList.add(`theme-${theme}`);
    }
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("chat-theme-color", theme);
    applyTheme(theme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="size-4" />
          Chat Color
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={currentTheme} onValueChange={handleThemeChange}>
          {THEME_COLORS.map(({ name, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </>
  );
}

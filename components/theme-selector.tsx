"use client";

import { useColorTheme, type ColorTheme } from "@/hooks/use-color-theme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PaletteIcon } from "lucide-react";

const THEME_OPTIONS: { value: ColorTheme; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "ocean", label: "Ocean" },
  { value: "aurora", label: "Aurora" },
  { value: "forest", label: "Forest" },
];

export function ThemeSelector() {
  const { theme, changeTheme, mounted } = useColorTheme();

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        asChild
      >
        <DropdownMenuTrigger>
          <PaletteIcon className="h-4 w-4" />
          <span className="sr-only">Change theme color</span>
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs">Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => changeTheme(value as ColorTheme)}>
          {THEME_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

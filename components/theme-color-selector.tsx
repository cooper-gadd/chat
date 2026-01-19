"use client";

import { Check } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useThemeColor, type ThemeColor } from "@/context/theme-color";

const THEME_COLORS: { value: ThemeColor; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "rose", label: "Rose" },
];

export function ThemeColorSelector() {
  const { themeColor, setThemeColor } = useThemeColor();

  return (
    <>
      <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium">
        Chat Theme
      </DropdownMenuLabel>
      <div className="grid grid-cols-2 gap-1 px-1">
        {THEME_COLORS.map((color) => (
          <DropdownMenuCheckboxItem
            key={color.value}
            checked={themeColor === color.value}
            onCheckedChange={() => setThemeColor(color.value)}
            className="flex cursor-pointer items-center justify-between"
          >
            <span className="text-sm">{color.label}</span>
            {themeColor === color.value && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuCheckboxItem>
        ))}
      </div>
    </>
  );
}

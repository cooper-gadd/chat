"use client";

import { Palette, Check } from "lucide-react";
import { useChatTheme } from "@/context/chat-theme";
import { chatThemes } from "@/lib/chat-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatThemeSelector({ variant = "sidebar" }: { variant?: "sidebar" | "standalone" }) {
  const { currentTheme, setTheme } = useChatTheme();

  if (variant === "sidebar") {
    return (
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        className="p-0"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center px-2 py-1.5 text-sm">
              <Palette className="mr-2 h-4 w-4" />
              Chat Theme
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chatThemes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className="flex items-center justify-between"
              >
                <span>{theme.name}</span>
                {currentTheme.id === theme.id && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="mr-2 h-4 w-4" />
          Chat Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {chatThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="flex items-center justify-between"
          >
            <span>{theme.name}</span>
            {currentTheme.id === theme.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
"use client";

import { Palette } from "lucide-react";
import { useChatTheme } from "@/context/chat-theme";
import { chatThemes } from "@/lib/chat-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggleButton() {
  const { currentTheme, setTheme } = useChatTheme();

  // Find the next theme in the list
  const toggleTheme = () => {
    const currentIndex = chatThemes.findIndex(t => t.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % chatThemes.length;
    setTheme(chatThemes[nextIndex].id);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chat Theme: {currentTheme.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
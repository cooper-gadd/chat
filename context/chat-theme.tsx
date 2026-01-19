"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ChatTheme, chatThemes } from "@/lib/chat-themes";

type ChatThemeContextType = {
  currentTheme: ChatTheme;
  setTheme: (themeId: string) => void;
};

const ChatThemeContext = createContext<ChatThemeContextType | undefined>(undefined);

const STORAGE_KEY = "chat-theme";

export function ChatThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ChatTheme>(chatThemes[0]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem(STORAGE_KEY);
    if (savedThemeId) {
      const theme = chatThemes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = chatThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem(STORAGE_KEY, themeId);
    }
  };

  return (
    <ChatThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ChatThemeContext.Provider>
  );
}

export function useChatTheme() {
  const context = useContext(ChatThemeContext);
  if (!context) {
    throw new Error("useChatTheme must be used within a ChatThemeProvider");
  }
  return context;
}
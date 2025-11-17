"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PendingMessageContextType {
  pendingMessage: string | null;
  setPendingMessage: (msg: string | null) => void;
}

const PendingMessageContext = createContext<
  PendingMessageContextType | undefined
>(undefined);

export function PendingMessageProvider({ children }: { children: ReactNode }) {
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  return (
    <PendingMessageContext.Provider
      value={{ pendingMessage, setPendingMessage }}
    >
      {children}
    </PendingMessageContext.Provider>
  );
}

export function usePendingMessage() {
  const context = useContext(PendingMessageContext);
  if (!context) throw new Error("usePendingMessage must be within provider");
  return context;
}

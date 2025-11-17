"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ThreadContextType {
  threadId: number | null;
  setThreadId: (id: number | null) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [threadId, setThreadId] = useState<number | null>(null);

  return (
    <ThreadContext.Provider value={{ threadId, setThreadId }}>
      {children}
    </ThreadContext.Provider>
  );
}

export function useThread() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error("useThread must be used within a ThreadProvider");
  }
  return context;
}

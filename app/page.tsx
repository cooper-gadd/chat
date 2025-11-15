"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/suggestions";
import { ChatInput } from "@/components/chat-input";

export default function Page() {
  const [selected, setSelected] = useState<string>(suggestions[0].title);
  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;

  return (
    <main className="flex h-full justify-center items-center p-3 md:p-5 w-full flex-col">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="gap-4 flex flex-col items-start max-w-3xl">
          <h1 className="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight text-center">
            How can I help today?
          </h1>
          <div className="flex gap-2">
            {suggestions.map((suggestion) => (
              <Button
                className="rounded-full"
                variant={selected === suggestion.title ? "default" : "outline"}
                onClick={() => setSelected(suggestion.title)}
                key={suggestion.title}
              >
                <suggestion.icon />
                {suggestion.title}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {suggestionOptions!.map((option) => (
              <p
                key={option}
                className="border-secondary/40 flex items-start gap-2 border-t py-1 first:border-none"
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <ChatInput />
      </div>
    </main>
  );
}

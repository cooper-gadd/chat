"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/suggestions";

export default function Page() {
  const [selected, setSelected] = useState<string>(suggestions[0].title);

  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;

  return (
    <main className="flex items-center justify-center p-6 md:p-10 w-full">
      <div className="gap-4 flex flex-col">
        <h1 className="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
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
    </main>
  );
}

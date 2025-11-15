import { suggestions } from "@/data/suggestions";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

export function Empty({
  setInput,
}: {
  setInput: Dispatch<SetStateAction<string>>;
}) {
  const [selected, setSelected] = useState<string>(suggestions[0].title);
  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;

  return (
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
        <div className="text-foreground flex flex-col w-full">
          {suggestionOptions!.map((option) => (
            <div
              key={option}
              className="border-secondary flex items-start gap-2 border-t py-1 first:border-none"
            >
              <button
                onClick={() => setInput(option)}
                className="text-secondary-foreground hover:bg-secondary w-full rounded-md p-2 text-left"
              >
                {option}
              </button>
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

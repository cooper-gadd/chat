"use client";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { createThread } from "@/actions/create-thread";
import { usePendingMessage } from "@/context/pending-message";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/suggestions";

export default function Page() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string>(suggestions[0].title);
  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;
  const { setPendingMessage } = usePendingMessage();

  async function send() {
    if (input.length === 0) return;

    const threadId = await createThread({ title: input });
    setPendingMessage(input);
    setInput("");

    redirect(`/${threadId}`);
  }

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
      <form className="w-full max-w-3xl" onSubmit={() => send()}>
        <InputGroup className="max-w-3xl">
          <InputGroupTextarea
            placeholder="Ask anything"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && input.length > 0) {
                send();
              }
            }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              className="rounded-full ml-auto"
              size="icon-xs"
              disabled={input.length === 0}
              onClick={() => send()}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </main>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/suggestions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

export default function Page() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string>(suggestions[0].title);
  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;

  return (
    <main className="flex h-full justify-center items-center p-3 md:p-5 w-full flex-col">
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-[85%] md:max-w-3xl flex-col gap-2 rounded-lg px-3 py-2 text-sm wrap-break-word",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="gap-4 flex flex-col items-start max-w-3xl">
            <h1 className="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight text-center">
              How can I help today?
            </h1>
            <div className="flex gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  className="rounded-full"
                  variant={
                    selected === suggestion.title ? "default" : "outline"
                  }
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
                  className="border-secondary flex items-start gap-2 border-t py-1 first:border-none"
                >
                  {option}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-3xl">
        <InputGroup className="max-w-3xl">
          <InputGroupTextarea
            placeholder="Ask anything"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              className="rounded-full ml-auto"
              size="icon-xs"
              disabled={input.length === 0}
              onClick={(e) => {
                e.preventDefault();
                sendMessage({ text: input });
                setInput("");
              }}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </main>
  );
}

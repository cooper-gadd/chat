"use client";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { Empty } from "@/components/empty";

export default function Page() {
  const { messages, sendMessage } = useChat({ experimental_throttle: 50 });
  const [input, setInput] = useState("");

  function send() {
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <main className="flex h-full justify-center items-center p-3 md:p-5 w-full flex-col">
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto pb-4">
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
                      return (
                        <MemoizedMarkdown
                          key={`${message.id}-${i}`}
                          id={`${message.id}-${i}`}
                          content={part.text}
                        />
                      );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty setInput={setInput} />
      )}
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

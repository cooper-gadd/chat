"use client";
import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon, CopyIcon, GitBranchIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { DefaultChatTransport, UIMessage } from "ai";
import { Message, Thread } from "@/db/schema";
import { usePendingMessage } from "@/context/pending-message";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export function PageClient({
  thread,
}: {
  thread: Thread & { messages: Message[] };
}) {
  const [input, setInput] = useState("");
  const { pendingMessage, setPendingMessage } = usePendingMessage();
  const hasSentPending = useRef(false);

  const initialMessages: UIMessage[] = thread.messages.map((msg) => ({
    id: msg.id.toString(),
    role: msg.role,
    parts: [{ type: "text" as const, text: msg.content }],
    createdAt: msg.createdAt,
  }));

  const { messages, sendMessage } = useChat({
    experimental_throttle: 50,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages }) {
        return {
          body: {
            message: messages[messages.length - 1],
            threadId: thread.id,
          },
        };
      },
    }),
  });

  async function send() {
    if (input.length === 0) return;
    await sendMessage({ text: input });
    setInput("");
  }

  useEffect(() => {
    if (pendingMessage && !hasSentPending.current) {
      hasSentPending.current = true;
      sendMessage({ text: pendingMessage });
      setPendingMessage(null);
    }
  }, [pendingMessage, setPendingMessage, sendMessage]);

  return (
    <>
      <Header thread={thread} />
      <main className="flex h-full justify-center items-center p-3 md:p-5 w-full flex-col">
        <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto pb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "group flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div className="flex flex-col">
                  <div
                    className={cn(
                      "inline-flex flex-col gap-2 rounded-lg px-3 py-2 text-sm wrap-break-word md:max-w-3xl",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
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
                  <div
                    className={cn(
                      "flex gap-1 items-center mt-1  opacity-0 group-hover:opacity-100 transition-opacity",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => {
                            const textToCopy = message.parts
                              .filter((part) => part.type === "text")
                              .map((part) => part.text)
                              .join("\n");
                            navigator.clipboard
                              .writeText(textToCopy)
                              .then(() => {
                                toast("Copied to clipboard!");
                              })
                              .catch((err) => {
                                toast.error("Failed to copy: ", err);
                              });
                          }}
                        >
                          <CopyIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <GitBranchIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Branch off</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
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
    </>
  );
}

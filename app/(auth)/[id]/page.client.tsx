"use client";

import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { Message as MessageType, Thread } from "@/db/schema";
import { usePendingMessage } from "@/context/pending-message";
import { Header } from "@/components/header";
import { Messages } from "@/components/messages";

export function PageClient({
  thread,
}: {
  thread: Thread & { messages: MessageType[] } & {
    parent: Thread | null;
  } & {
    children: Thread[];
  };
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
    setInput("");
    await sendMessage({ text: input });
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
            <Messages messages={messages} threadId={thread.id} />
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

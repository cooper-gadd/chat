"use client";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { Empty } from "@/components/empty";
import { createThread } from "@/actions/create-thread";
import { usePendingMessage } from "@/context/pending-message";
import { redirect } from "next/navigation";

export default function Page() {
  const [input, setInput] = useState("");
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
      <Empty setInput={setInput} />
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

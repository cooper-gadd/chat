"use client";

import { CopyIcon, GitBranchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { UIDataTypes, UIMessage, UITools } from "ai";

export function Message({
  message,
}: {
  message: UIMessage<unknown, UIDataTypes, UITools>;
}) {
  return (
    <div
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
  );
}

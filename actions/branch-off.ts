"use server";

import { messages as messagesTable } from "@/db/schema";
import { createThread } from "./create-thread";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { UIDataTypes, UIMessage, UITools } from "ai";
import { extractText } from "@/lib/utils";

export async function branchOff({
  messages,
  branchMessage,
  threadId: parentThreadId,
}: {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  branchMessage: UIMessage<unknown, UIDataTypes, UITools>;
  threadId: number;
}) {
  const branchIndex = messages.findIndex((msg) => msg.id === branchMessage.id);

  if (branchIndex === -1) {
    throw new Error("No branch index");
  }

  const messagesToCopy = messages.slice(0, branchIndex + 1);

  return await db.transaction(async (tx) => {
    const childThreadId = await createThread({
      title: `Branch off ${extractText(branchMessage.parts).slice(0, 30).replace(/\n/g, " ")}...`,
      parentThreadId,
    });

    await tx.insert(messagesTable).values(
      messagesToCopy.map((msg) => ({
        threadId: childThreadId,
        role: msg.role,
        content: extractText(msg.parts),
        tag: msg.id,
      })),
    );

    revalidatePath("/", "layout");
    return childThreadId;
  });
}

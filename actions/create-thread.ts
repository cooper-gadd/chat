"use server";

import { db } from "@/db";
import { getCurrentUser } from "./get-current-user";
import { CreateThread, threads } from "@/db/schema";
import { revalidatePath } from "next/cache";

function createTitle(prompt: string): string {
  let title = prompt.trim().slice(0, 256); // 256 chars from db
  const prefixes = [
    "help me",
    "can you",
    "please",
    "write",
    "explain",
    "what is",
    "how to",
  ];

  const lowerTitle = title.toLowerCase();

  for (const prefix of prefixes) {
    if (lowerTitle.startsWith(prefix + " ")) {
      title = title.slice(prefix.length).trim();

      if (
        title.startsWith("to ") ||
        title.startsWith("with ") ||
        title.startsWith("a ") ||
        title.startsWith("an ")
      ) {
        title = title.split(" ").slice(1).join(" ");
      }

      break;
    }
  }

  title = title.charAt(0).toUpperCase() + title.slice(1);

  return title || "Untitled Chat";
}

export async function createThread({
  title,
  parentThreadId,
}: Omit<CreateThread, "userId">) {
  const currentUser = await getCurrentUser();

  const threadTitle = createTitle(title);

  const [thread] = await db
    .insert(threads)
    .values({
      userId: currentUser.id,
      title: threadTitle,
      parentThreadId,
    })
    .returning();

  revalidatePath("/");

  return thread.id;
}

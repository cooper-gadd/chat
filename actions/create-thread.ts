"use server";

import { db } from "@/db";
import { getCurrentUser } from "./get-current-user";
import { CreateThread, threads } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createThread({
  title,
  parentThreadId,
}: Omit<CreateThread, "userId">) {
  const currentUser = await getCurrentUser();

  const [thread] = await db
    .insert(threads)
    .values({
      userId: currentUser.id,
      title:
        title.trim().slice(0, 256).charAt(0).toUpperCase() + title.slice(1),
      parentThreadId,
    })
    .returning();

  revalidatePath("/");

  return thread.id;
}

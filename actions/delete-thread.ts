"use server";

import { db } from "@/db";
import { threads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteThread({ threadId }: { threadId: number }) {
  await db.delete(threads).where(eq(threads.id, threadId));

  revalidatePath("/", "layout");
}

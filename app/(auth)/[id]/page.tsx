import { db } from "@/db";
import { PageClient } from "./page.client";
import { redirect } from "next/navigation";
import { getThreadHistory, ThreadHistory } from "@/actions/get-thread-history";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const thread = await db.query.threads.findFirst({
    where: (thread, { eq }) => eq(thread.id, Number(id)),
    with: {
      messages: true,
    },
  });

  if (!thread) {
    redirect("/");
  }

  let threadHistory: ThreadHistory[] | undefined = undefined;

  if (thread.parentThreadId) {
    const res = await getThreadHistory({
      threadId: thread.parentThreadId,
    });

    threadHistory = res;
  }

  return <PageClient thread={thread} threadHistory={threadHistory} />;
}

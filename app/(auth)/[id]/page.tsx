import { db } from "@/db";
import { PageClient } from "./page.client";
import { redirect } from "next/navigation";

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

  return <PageClient thread={thread} />;
}

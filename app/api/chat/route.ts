import { db } from "@/db";
import { google } from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  UIMessage,
  createIdGenerator,
} from "ai";
import { messages as messagesTable } from "@/db/schema";
import { extractText } from "@/lib/utils";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { message, threadId }: { message: UIMessage; threadId: number | null } =
    await req.json();

  if (!threadId) {
    throw new Error("No threadId found");
  }

  const thread = await db.query.threads.findFirst({
    where: (threads, { eq }) => eq(threads.id, threadId),
    with: {
      messages: true,
    },
  });

  if (!thread) {
    throw new Error("No thread found");
  }

  const previousMessages: UIMessage[] = thread.messages.map((msg) => ({
    id: msg.id.toString(),
    role: msg.role,
    parts: [{ type: "text" as const, text: msg.content }],
    createdAt: msg.createdAt,
  }));

  const messages = [...previousMessages, message];

  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    generateMessageId: createIdGenerator({ prefix: "msg", size: 16 }),
    async onFinish({ messages: finishedMessages }) {
      const userMessage = finishedMessages[finishedMessages.length - 2];
      const assistantMessage = finishedMessages[finishedMessages.length - 1];

      const userText = extractText(userMessage.parts);
      const assistantText = extractText(assistantMessage.parts);

      await db.insert(messagesTable).values([
        {
          threadId,
          role: userMessage.role,
          content: userText,
          tag: userMessage.id,
        },
        {
          threadId,
          role: assistantMessage.role,
          content: assistantText,
          tag: assistantMessage.id,
        },
      ]);
    },
  });
}

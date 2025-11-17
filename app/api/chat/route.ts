import { db } from "@/db";
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { messages as messagesTable } from "@/db/schema";

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
    async onFinish({ messages: finishedMessages }) {
      const userMessage = message;
      const assistantMessage = finishedMessages[finishedMessages.length - 1];

      let userText = "";
      for (const part of userMessage.parts) {
        if (part.type === "text") {
          userText += part.text;
        }
      }

      let assistantText = "";
      for (const part of assistantMessage.parts) {
        if (part.type === "text") {
          assistantText += part.text;
        }
      }

      await db.insert(messagesTable).values({
        threadId,
        role: userMessage.role,
        content: userText,
      });

      await db.insert(messagesTable).values({
        threadId,
        role: assistantMessage.role,
        content: assistantText,
      });
    },
  });
}

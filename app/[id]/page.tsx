import { cn } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = Number((await params).id);

  const messages = [
    {
      content: "hello how do i make app",
      role: "user",
    },
    {
      content: "what app",
      role: "assistant",
    },
    {
      content: "a good one",
      role: "user",
    },
  ];

  return (
    <main className="p-3 md:p-5">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted",
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
    </main>
  );
}

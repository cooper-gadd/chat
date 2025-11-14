import { Suggestions } from "@/components/suggestions";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 md:p-10 w-full">
      <div className="gap-4 flex flex-col">
        <h1 className="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
          How can I help today?
        </h1>
        <Suggestions />
      </div>
    </main>
  );
}

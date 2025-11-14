import { Suggestions } from "@/components/suggestions";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen gap-4 justify-center p-10 w-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        How can I help today?
      </h1>
      <Suggestions />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
          Chat
        </h1>
        <p className="text-xl text-muted-foreground">
          This is a really cool app I built
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/login">Chat now!</Link>
        </Button>
      </div>
    </div>
  );
}

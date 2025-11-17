import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/actions/get-current-user";
import { db } from "@/db";
import { ThreadProvider } from "@/context/thread";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  const threads = await db.query.threads.findMany({
    where: (threads, { eq }) => eq(threads.userId, user.id),
    orderBy: (threads, { desc }) => [desc(threads.id)],
  });

  return (
    <SidebarProvider>
      <ThreadProvider>
        <AppSidebar currentUser={user} threads={threads} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </ThreadProvider>
    </SidebarProvider>
  );
}

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/actions/get-current-user";
import { db } from "@/db";
import { PendingMessageProvider } from "@/context/pending-message";
import { ThemeColorProvider } from "@/context/theme-color";
import { getUserPreferences } from "@/actions/get-user-preferences";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const preferences = await getUserPreferences();

  const threads = await db.query.threads.findMany({
    where: (threads, { eq }) => eq(threads.userId, user.id),
    orderBy: (threads, { desc }) => [desc(threads.id)],
  });

  return (
    <SidebarProvider>
      <ThemeColorProvider initialThemeColor={preferences.themeColor}>
        <PendingMessageProvider>
          <AppSidebar currentUser={user} threads={threads} />
          <SidebarInset>{children}</SidebarInset>
        </PendingMessageProvider>
      </ThemeColorProvider>
    </SidebarProvider>
  );
}

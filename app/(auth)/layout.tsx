import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/actions/get-current-user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has("session");

  if (!hasSession) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar currentUser={user} />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

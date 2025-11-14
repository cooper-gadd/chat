import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavItems } from "./nav-items";
import { Button } from "./ui/button";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-lg font-medium text-center">Chat</span>
        <Button asChild>
          <Link href="/chat">New Chat</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <NavItems />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Cooper",
            email: "cooper@me.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

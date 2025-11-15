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
    <Sidebar variant="inset">
      <SidebarHeader>
        <Button asChild>
          <Link href="/">New Chat</Link>
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

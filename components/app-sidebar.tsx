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
import { CurrentUser } from "@/actions/get-current-user";

export function AppSidebar({ currentUser }: { currentUser: CurrentUser }) {
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
        <NavUser currentUser={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

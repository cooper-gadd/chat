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
import { Thread } from "@/db/schema";

export function AppSidebar({
  currentUser,
  threads,
}: {
  currentUser: CurrentUser;
  threads: Thread[];
}) {
  return (
    <Sidebar variant="inset">
      {threads.length > 0 ? (
        <SidebarHeader>
          <Button asChild>
            <Link href="/">New Chat</Link>
          </Button>
        </SidebarHeader>
      ) : null}
      <SidebarContent>
        <NavItems threads={threads} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser currentUser={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

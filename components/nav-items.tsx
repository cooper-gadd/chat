"use client";
import { deleteThread } from "@/actions/delete-thread";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Thread } from "@/db/schema";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavItems({ threads }: { threads: Thread[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {threads.length > 0 ? "Chats" : "No Chats"}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {threads.map((thread) => {
            const isActive = pathname === `/${thread.id}`;

            return (
              <SidebarMenuItem key={thread.id} className="flex gap-1">
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={`/${thread.id}`}>
                    <span className="truncate">{thread.title}</span>
                  </Link>
                </SidebarMenuButton>
                <Button
                  className={cn(
                    "ml-auto transition-opacity",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover/menu-item:opacity-100",
                  )}
                  size="icon-sm"
                  variant="ghost"
                  onClick={async () => {
                    await deleteThread({ threadId: thread.id });
                  }}
                >
                  <TrashIcon className="text-destructive" />
                </Button>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

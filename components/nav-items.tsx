"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useThread } from "@/context/thread";
import { Thread } from "@/db/schema";

export function NavItems({ threads }: { threads: Thread[] }) {
  const { threadId, setThreadId } = useThread();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {threads.length > 0 ? "Chats" : "No Chats"}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {threads.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => {
                  setThreadId(item.id);
                }}
                isActive={item.id === threadId}
              >
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

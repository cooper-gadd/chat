"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={`https://avatar.vercel.sh/${user.name}`}
            alt={user.name}
          />
          <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <LogOut className="ml-auto size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

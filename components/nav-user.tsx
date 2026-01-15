"use client";

import { ChevronsUpDown, GithubIcon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { CurrentUser } from "@/actions/get-current-user";
import { logout } from "@/actions/logout";

export function NavUser({ currentUser }: { currentUser: CurrentUser }) {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${currentUser.name}`}
                  alt={currentUser.name}
                />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentUser.name}</span>
                <span className="truncate text-xs">{currentUser.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${currentUser.name}`}
                    alt={currentUser.name}
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {currentUser.name}
                  </span>
                  <span className="truncate text-xs">
                    {currentUser.username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="http://github.com/cooper-gadd/chat" target="_blank">
                  <GithubIcon />
                  Star on Github
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={theme ?? "system"}
              onValueChange={setTheme}
            >
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ocean">
                Ocean
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await logout();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

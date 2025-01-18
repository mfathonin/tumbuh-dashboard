"use client";

import { Sprout } from "lucide-react";
import * as React from "react";

import { NavSections } from "@/components/nav-sections";
import { NavUserProfile } from "@/components/nav-user-profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavigationRoutes } from "@/libs/constants";
import { User } from "@supabase/supabase-js";

type AppSidebarProps = {
  user: User;
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Sprout className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Nararya Labs</span>
                  <span className="truncate text-xs">Foster Growth</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSections label="Data" items={NavigationRoutes.navMain} />
        <NavSections label="Tools" items={NavigationRoutes.tools} />
      </SidebarContent>
      <SidebarFooter>
        <NavUserProfile user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

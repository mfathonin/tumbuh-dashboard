"use client";

import {
  ChartSpline,
  Frame,
  House,
  Map,
  PieChart,
  Settings2,
  Sprout,
  SquareTerminal,
  WalletCards,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavTools } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Configurations",
      url: "/config",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Wallets",
          url: "/wallets",
        },
        {
          title: "Goals",
          url: "/goals",
        },
        {
          title: "Budgets",
          url: "/budgets",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartSpline,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: WalletCards,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        <NavTools projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

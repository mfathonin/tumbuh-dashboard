import {
  ArrowRightLeft,
  ChartSpline,
  Combine,
  LayoutDashboard,
  LucideIcon,
  ScrollText,
  Server,
  Settings,
  WalletCards,
} from "lucide-react";

type ChildNavItem = {
  title: string;
  url: string;
};
export type NavigationItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: ChildNavItem[];
};

export const NavigationRoutes: Record<string, NavigationItem[]> = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowRightLeft,
    },
    {
      title: "Finances",
      url: "/finances",
      icon: WalletCards,
      items: [
        {
          title: "Goals",
          url: "/finances/goals",
        },
        {
          title: "Budgets",
          url: "/finances/budgets",
        },
        {
          title: "Wallets",
          url: "/finances/wallets",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartSpline,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Categories",
          url: "/settings/categories",
        },
      ],
    },
  ],
  tools: [
    {
      title: "Wallet Sync",
      url: "/wallet-sync",
      icon: Combine,
    },
    {
      title: "Pending Transaction",
      url: "/pending-transactions",
      icon: ScrollText,
    },
    {
      title: "Import & Export",
      url: "/manage-data",
      icon: Server,
    },
  ],
};

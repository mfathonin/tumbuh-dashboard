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

export const NavigationRoutes = {
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
  ] as NavigationItem[],
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
  ] as NavigationItem[],
};

export function getTitlesAndUrls(pathName: string) {
  const titles: string[] = [];
  const urls: string[] = [];

  // Iterate over all sections in NavigationRoutes (including both navMain and tools)
  Object.values(NavigationRoutes).forEach((sections) => {
    sections.forEach((section) => {
      // Check if the section URL matches the pathName (parent path match)
      if (section.url === pathName) {
        titles.push(section.title);
        urls.push(section.url);
      }

      // If this section has items, check them for the pathName (sub-path match)
      if (section.items) {
        section.items.forEach((item) => {
          if (item.url === pathName) {
            titles.push(section.title, item.title);
            urls.push(section.url, item.url);
          }
        });
      }
    });
  });

  return { titles, urls };
}

export const Errors = {
  auth: {
    INVALID_CREDENTIALS: {
      message: "Email & password not found",
      code: "AUTH_INVALID_CREDENTIAL",
      status: 404,
    },
    USER_EXIST: {
      message: "User already registered",
      code: "AUTH_USER_EXIST",
      status: 400,
    },
  },
  general: {
    INVALID_FORMAT: {
      message: "Invalid Data format",
      code: "INVALID_FORMAT",
      status: 400,
    },
    INVALID_UUID: {
      message: "Invalid ID format",
      code: "INVALID_UUID",
      status: 400,
    },
    UNKNOWN: { message: "Something went wrong", code: "UNKNOWN", status: 500 },
  },
} as const;

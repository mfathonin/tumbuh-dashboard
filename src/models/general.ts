import type { LucideIcon } from "lucide-react";

export type ErrorCodes = {
  message: string;
  code: string;
  status: number;
};

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

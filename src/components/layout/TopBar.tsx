"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft, Sidebar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

export function TopBar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    {segment}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <i className="bx bx-user text-3xl text-gray-600"></i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeToggle />
    </header>
  );
}

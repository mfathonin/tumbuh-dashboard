"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavigationRoutes } from "@/lib/constants";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppBreadcrumb() {
  const path = usePathname();

  const paths = path
    .split("/")
    .slice(1)
    .map((p) => `/${p}`)
    .map((p, i, ps) => [i - 1 >= 0 ? ps[i - 1] : "", p].join(""));

  const items = [
    NavigationRoutes.navMain.find((topLevel) => {
      return topLevel.url === paths[0];
    }),
    NavigationRoutes.navMain
      .find((topLevel) => topLevel.url === paths[0])
      ?.items?.find((secondLevel) => secondLevel.url === paths[1]),
  ].filter((i) => !!i);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => {
          if (i < items.length - 1)
            return (
              <React.Fragment key={`link_${(item.title + i).toString()}`}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={item?.url}>
                    {item?.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            );
          return (
            <BreadcrumbItem key={`page_${(item.title + i).toString()}`}>
              <BreadcrumbPage>{item?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

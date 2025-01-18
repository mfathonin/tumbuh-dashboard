"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTitlesAndUrls } from "@/libs/constants";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppBreadcrumb() {
  const path = usePathname();

  const { titles, urls } = getTitlesAndUrls(path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {titles.map((title, i) => {
          if (i < titles.length - 1)
            return (
              <React.Fragment key={`link_${(title + i).toString()}`}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={urls[i]}>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            );
          return (
            <BreadcrumbItem key={`page_${(title + i).toString()}`}>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

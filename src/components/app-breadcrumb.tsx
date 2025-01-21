"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTitlesAndUrls } from "@/libs/constants";

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
                  <BreadcrumbLink asChild>
                    <Link href={urls[i]}>{title}</Link>
                  </BreadcrumbLink>
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

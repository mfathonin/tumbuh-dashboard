import { Metadata } from "next";
import { DashboardShell } from "@/components/modules/dashboard/DashboardShell";
import { DashboardHeader } from "@/components/modules/dashboard/DashboardHeader";
import { DashboardContent } from "@/app/(home)/components/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Financial Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Financial Dashboard" />
      <DashboardContent />
    </DashboardShell>
  );
}

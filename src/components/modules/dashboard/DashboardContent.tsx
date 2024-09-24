"use client";

import { BudgetOverview } from "@/app/(home)/components/BudgetOverview";
import { NetWorthChart } from "@/app/(home)/components/NetWorthChart";
import { SpendingPieChart } from "@/app/(home)/components/SpendingPieChart";
import { StatCards } from "@/app/(home)/components/StatCards";
import { WalletsPieChart } from "@/app/(home)/components/WalletsPieChart";

export function DashboardContent() {
  return (
    <div className="space-y-4">
      <StatCards />
      <div className="grid gap-4 md:grid-cols-2">
        <NetWorthChart />
        <SpendingPieChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <WalletsPieChart />
        <BudgetOverview />
      </div>
    </div>
  );
}

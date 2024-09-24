import { StatCard } from "@/components/modules/StatCard";

export function StatCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Balance"
        value="$17,500"
        change="+2.5% from last month"
        icon="bx-dollar"
      />
      <StatCard
        title="Income"
        value="$4,200"
        change="+5% from last month"
        icon="bx-trending-up"
        iconColor="text-green-500"
      />
      <StatCard
        title="Expenses"
        value="$1,800"
        change="-3% from last month"
        icon="bx-trending-down"
        iconColor="text-red-500"
      />
      <StatCard
        title="Savings Rate"
        value="57%"
        change="+10% from last month"
        icon="bx-pie-chart"
      />
    </div>
  );
}

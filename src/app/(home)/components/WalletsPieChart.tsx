"use client";

import { ChartCard } from "@/components/modules/ChartCard";
import { Cell, Pie, PieChart } from "recharts";

const walletData = [
  { name: "Checking", value: 2500, color: "hsl(var(--chart-1))" },
  { name: "Savings", value: 10000, color: "hsl(var(--chart-2))" },
  { name: "Investment", value: 5000, color: "hsl(var(--chart-3))" },
];

export function WalletsPieChart() {
  return (
    <ChartCard title="Wallets" height={200}>
      <PieChart>
        <Pie
          data={walletData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="hsl(var(--chart-1))"
          dataKey="value"
          label={({ name, value }) => `${name}: $${value}`}
        >
          {walletData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}

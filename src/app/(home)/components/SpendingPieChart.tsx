"use client";

import { ChartCard } from "@/components/modules/ChartCard";
import { Cell, Pie, PieChart } from "recharts";

const categoryData = [
  { name: "Food", value: 500, color: "hsl(var(--chart-1))" },
  { name: "Transport", value: 300, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", value: 200, color: "hsl(var(--chart-3))" },
  { name: "Bills", value: 800, color: "hsl(var(--chart-4))" },
];

export function SpendingPieChart() {
  return (
    <ChartCard title="Spending by Category" height={200}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: $${value}`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}

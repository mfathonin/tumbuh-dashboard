"use client";

import { ChartCard } from "@/components/modules/ChartCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const netWorthData = [
  { month: "Jan 2022", netWorth: 15000 },
  { month: "Feb 2022", netWorth: 16200 },
  { month: "Mar 2022", netWorth: 15500 },
  { month: "Apr 2022", netWorth: 14800 },
  { month: "May 2022", netWorth: 16500 },
  { month: "Jun 2022", netWorth: 17800 },
  { month: "Jul 2022", netWorth: 16300 },
  { month: "Aug 2022", netWorth: 18200 },
  { month: "Sep 2022", netWorth: 17000 },
  { month: "Oct 2022", netWorth: 19500 },
  { month: "Nov 2022", netWorth: 18800 },
  { month: "Dec 2022", netWorth: 20500 },
  { month: "Jan 2023", netWorth: 19000 },
  { month: "Feb 2023", netWorth: 21000 },
  { month: "Mar 2023", netWorth: 20200 },
  { month: "Apr 2023", netWorth: 18700 },
  { month: "May 2023", netWorth: 22000 },
  { month: "Jun 2023", netWorth: 21500 },
  { month: "Jul 2023", netWorth: 23500 },
  { month: "Aug 2023", netWorth: 22800 },
  { month: "Sep 2023", netWorth: 24500 },
  { month: "Oct 2023", netWorth: 23000 },
  { month: "Nov 2023", netWorth: 25500 },
  { month: "Dec 2023", netWorth: 27000 },
];

export function NetWorthChart() {
  return (
    <ChartCard
      title="Net Worth Progress"
      description={
        <p className="text-4xl tabular-nums">
          <span className="font-normal text-muted-foreground text-lg">Rp</span>
          17500
        </p>
      }
    >
      <ChartContainer config={{ month: { label: "Month" } }}>
        <AreaChart accessibilityLayer data={netWorthData}>
          <defs>
            <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis orientation="right" axisLine={false} tickLine={true} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
            formatter={(value, name, item) => (
              <div className="flex flex-col gap-0.5 min-w-[120px] items-start text-xs text-muted-foreground">
                <span className="font-normal text-muted-foreground">
                  Net Worth
                </span>
                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                  <span className="font-normal text-muted-foreground">Rp</span>
                  {value} ({item.payload.month})
                </div>
              </div>
            )}
          />
          <Area
            type="monotone"
            dataKey="netWorth"
            stroke="hsl(var(--chart-2))"
            fill="url(#colorNetWorth)"
            fillOpacity={1}
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}

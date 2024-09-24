"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const categoryData = [
  { name: "Food", value: 500, color: "#FF6384" },
  { name: "Transport", value: 300, color: "#36A2EB" },
  { name: "Entertainment", value: 200, color: "#FFCE56" },
  { name: "Bills", value: 800, color: "#4BC0C0" },
];

export function BudgetOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm font-medium">
                  ${category.value} / $1000
                </span>
              </div>
              <Progress value={(category.value / 1000) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

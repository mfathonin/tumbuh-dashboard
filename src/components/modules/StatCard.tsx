import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  iconColor = "text-muted-foreground",
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <i className={`bx ${icon} ${iconColor}`}></i>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

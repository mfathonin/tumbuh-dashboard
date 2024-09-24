import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  description?: string | React.ReactElement;
  children: React.ReactElement;
  height?: number;
}

export function ChartCard({
  title,
  description,
  children,
  height = 300,
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>{title}</CardDescription>
        {description && (
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {description}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

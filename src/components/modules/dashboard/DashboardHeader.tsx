interface DashboardHeaderProps {
  heading: string;
}

export function DashboardHeader({ heading }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2 mb-10">
      <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
    </div>
  );
}

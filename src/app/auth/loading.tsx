import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="flex rounded-xl bg-card text-card-foreground shadow border h-[536px] p-6">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
}

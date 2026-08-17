import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-36 rounded-2xl w-full" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-3 w-24" />
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

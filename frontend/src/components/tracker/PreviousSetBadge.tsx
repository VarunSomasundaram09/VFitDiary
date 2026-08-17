import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";
import { workoutLogService } from "@/services/workoutLogService";

export function PreviousSetBadge({ exerciseId }: { exerciseId: number | null }) {
  const { data, isLoading } = useQuery({
    queryKey: ["previous-set", exerciseId],
    queryFn: () => workoutLogService.getPreviousSet(exerciseId as number),
    enabled: exerciseId !== null,
  });

  if (!exerciseId) return null;
  if (isLoading) {
    return <div className="h-6 w-40 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />;
  }
  if (!data?.hasPrevious) {
    return (
      <p className="text-xs text-slate-400 flex items-center gap-1.5">
        <History className="h-3.5 w-3.5" /> No previous data for this exercise yet
      </p>
    );
  }

  return (
    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
      <History className="h-3.5 w-3.5" />
      Last time: <span className="font-mono font-medium">{data.weightKg} kg × {data.reps}</span>
    </p>
  );
}

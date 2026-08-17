import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { calendarService } from "@/services/calendarService";

export function DayDetailPanel({ date }: { date: string | null }) {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["day-logs", date],
    queryFn: () => calendarService.getLogsOnDate(date as string),
    enabled: !!date,
  });

  if (!date) {
    return (
      <Card>
        <EmptyState
          icon={CalendarDays}
          title="Select a day"
          description="Pick a day on the calendar to see what you trained."
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <p className="font-display font-semibold">{format(parseISO(date), "EEEE, MMMM d")}</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />
        ) : !logs || logs.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
            No workout logged on this day.
          </p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id}>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {log.totalVolumeKg.toLocaleString()} kg total volume
                </p>
                <ul className="space-y-2">
                  {log.sets.map((set) => (
                    <li
                      key={set.id}
                      className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-sm"
                    >
                      <span>{set.exerciseName}</span>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {set.weightKg} kg × {set.reps}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { useMemo } from "react";
import { format, subDays, addDays, startOfWeek } from "date-fns";
import type { CalendarDay } from "@/types/calendar";

const INTENSITY_CLASSES = [
  "bg-slate-100 dark:bg-slate-800",
  "bg-primary-100 dark:bg-primary-900",
  "bg-primary-300 dark:bg-primary-700",
  "bg-primary-500",
  "bg-primary-600",
];

function intensityLevel(volumeKg: number): number {
  if (volumeKg <= 0) return 0;
  if (volumeKg < 2000) return 1;
  if (volumeKg < 4000) return 2;
  if (volumeKg < 6000) return 3;
  return 4;
}

const WEEKS = 53;
const DAYS_PER_WEEK = 7;

export function ActivityHeatmap({ data }: { data: CalendarDay[] }) {
  const dataByDate = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    data.forEach((d) => map.set(d.date, d));
    return map;
  }, [data]);

  const weeks = useMemo(() => {
    const totalDays = WEEKS * DAYS_PER_WEEK;
    const gridStart = startOfWeek(subDays(new Date(), totalDays - 1));

    const days = Array.from({ length: totalDays }, (_, i) => {
      const date = addDays(gridStart, i);
      const key = format(date, "yyyy-MM-dd");
      const entry = dataByDate.get(key);
      return {
        key,
        date,
        volume: entry?.totalVolumeKg ?? 0,
        count: entry?.workoutCount ?? 0,
      };
    });

    const cols: typeof days[] = [];
    for (let i = 0; i < days.length; i += DAYS_PER_WEEK) {
      cols.push(days.slice(i, i + DAYS_PER_WEEK));
    }
    return cols;
  }, [dataByDate]);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-flex gap-[3px]">
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.key}
                title={`${format(day.date, "MMM d, yyyy")} — ${day.count} session${day.count === 1 ? "" : "s"}, ${day.volume.toLocaleString()} kg`}
                className={`h-3 w-3 rounded-[2px] ${INTENSITY_CLASSES[intensityLevel(day.volume)]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
        Less
        {INTENSITY_CLASSES.map((cls, i) => (
          <div key={i} className={`h-2.5 w-2.5 rounded-[2px] ${cls}`} />
        ))}
        More
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarDay } from "@/types/calendar";
import { cn } from "@/utils/cn";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

interface MonthCalendarProps {
  data: CalendarDay[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export function MonthCalendar({ data, selectedDate, onSelectDate }: MonthCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  const dataByDate = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    data.forEach((d) => map.set(d.date, d));
    return map;
  }, [data]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(visibleMonth));
    const end = endOfWeek(endOfMonth(visibleMonth));
    return eachDayOfInterval({ start, end });
  }, [visibleMonth]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-display font-semibold">{format(visibleMonth, "MMMM yyyy")}</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setVisibleMonth((m) => subMonths(m, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="text-center text-xs font-medium text-slate-400 py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const entry = dataByDate.get(key);
          const hasActivity = !!entry && entry.workoutCount > 0;
          const inMonth = isSameMonth(day, visibleMonth);
          const isSelected = selectedDate === key;

          return (
            <button
              key={key}
              onClick={() => onSelectDate(key)}
              disabled={!inMonth}
              className={cn(
                "aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-colors relative",
                !inMonth && "opacity-0 pointer-events-none",
                isSelected && "ring-2 ring-primary",
                hasActivity
                  ? "bg-primary-100 dark:bg-primary-900/50 text-primary font-semibold"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
                isToday(day) && !hasActivity && "border border-primary text-primary"
              )}
            >
              {format(day, "d")}
              {hasActivity && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

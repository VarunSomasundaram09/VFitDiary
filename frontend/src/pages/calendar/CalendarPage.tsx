import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { ActivityHeatmap } from "@/components/calendar/ActivityHeatmap";
import { MonthCalendar } from "@/components/calendar/MonthCalendar";
import { DayDetailPanel } from "@/components/calendar/DayDetailPanel";
import { calendarService } from "@/services/calendarService";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data: heatmapData, isLoading: loadingHeatmap } = useQuery({
    queryKey: ["calendar-heatmap"],
    queryFn: () => calendarService.getHeatmap(365),
  });

  const { data: streaks, isLoading: loadingStreaks } = useQuery({
    queryKey: ["calendar-streaks"],
    queryFn: calendarService.getStreaks,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Calendar</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Your training history, at a glance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5 bg-gradient-to-br from-primary to-secondary text-white">
            <div className="flex items-center justify-between">
              <Flame className="h-5 w-5 text-white/80" />
              <span className="text-xs text-white/70">Current</span>
            </div>
            <p className="font-mono text-3xl font-bold mt-2">
              {loadingStreaks ? "—" : streaks?.currentStreak ?? 0}
              <span className="text-sm font-normal ml-1">days</span>
            </p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Trophy className="h-5 w-5 text-warning" />
              <span className="text-xs text-slate-400">Longest</span>
            </div>
            <p className="font-mono text-3xl font-bold mt-2 text-slate-900 dark:text-white">
              {loadingStreaks ? "—" : streaks?.longestStreak ?? 0}
              <span className="text-sm font-normal ml-1 text-slate-400">days</span>
            </p>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="font-display font-semibold mb-4">Past year</p>
          {loadingHeatmap ? (
            <div className="h-24 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />
          ) : (
            <ActivityHeatmap data={heatmapData ?? []} />
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <MonthCalendar
              data={heatmapData ?? []}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </CardContent>
        </Card>
        <DayDetailPanel date={selectedDate} />
      </div>
    </div>
  );
}

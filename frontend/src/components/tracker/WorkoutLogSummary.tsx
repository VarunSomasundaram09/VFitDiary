import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { WorkoutLogResult } from "@/types/tracker";

export function WorkoutLogSummary({ log }: { log: WorkoutLogResult }) {
  const prCount = log.sets.filter((s) => s.isPersonalRecord).length;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <div>
            <p className="font-display font-semibold">Session saved</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {log.sets.length} sets · {log.totalVolumeKg.toLocaleString()} kg total volume
            </p>
          </div>
          {prCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 text-warning text-xs font-semibold px-3 py-1.5">
              <Trophy className="h-3.5 w-3.5" /> {prCount} new PR{prCount > 1 ? "s" : ""}
            </span>
          )}
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5">
            {log.sets.map((set) => (
              <li
                key={set.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">#{set.setNumber}</span>
                  <span className="text-sm font-medium">
                    {set.weightKg} kg × {set.reps}
                  </span>
                  {set.isPersonalRecord && (
                    <Trophy className="h-3.5 w-3.5 text-warning" aria-label="New personal record" />
                  )}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Est. 1RM {set.estimated1rm} kg
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

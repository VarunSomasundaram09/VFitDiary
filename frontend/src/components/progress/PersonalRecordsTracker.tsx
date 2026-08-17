import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { personalRecordService } from "@/services/personalRecordService";
import { HERO_LIFTS } from "@/types/progress";

export function PersonalRecordsTracker() {
  const { data: records, isLoading } = useQuery({
    queryKey: ["personal-records"],
    queryFn: personalRecordService.getAll,
  });

  if (isLoading) {
    return <div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl" />;
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Trophy}
          title="No personal records yet"
          description="Log a set in the Tracker and your first PRs will show up here automatically."
        />
      </Card>
    );
  }

  const heroRecords = HERO_LIFTS.map((name) => records.find((r) => r.exerciseName === name)).filter(
    (r): r is NonNullable<typeof r> => !!r
  );
  const otherRecords = records.filter((r) => !HERO_LIFTS.includes(r.exerciseName));

  return (
    <div className="space-y-5">
      {heroRecords.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4">
          {heroRecords.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-5 bg-gradient-to-br from-primary to-secondary text-white">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="h-5 w-5 text-white/80" />
                  <span className="text-[11px] text-white/70">
                    {new Date(record.achievedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                </div>
                <p className="text-sm text-white/80">{record.exerciseName}</p>
                <p className="font-mono text-2xl font-bold mt-0.5">
                  {record.estimated1rm} <span className="text-sm font-normal">kg 1RM</span>
                </p>
                <p className="text-xs text-white/70 mt-1">
                  {record.bestWeightKg} kg × {record.bestReps}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {otherRecords.length > 0 && (
        <Card>
          <CardHeader className="pb-0">
            <p className="font-display font-semibold">All personal records</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {otherRecords.map((record) => (
                <li
                  key={record.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Dumbbell className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium">{record.exerciseName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{record.targetMuscle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold">{record.estimated1rm} kg</p>
                    <p className="text-xs text-slate-400">{record.bestWeightKg} kg × {record.bestReps}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

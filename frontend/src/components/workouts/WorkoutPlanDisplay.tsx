import { motion } from "framer-motion";
import { Clock, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { WorkoutPlan } from "@/types/workout";

export function WorkoutPlanDisplay({ plan }: { plan: WorkoutPlan }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="font-display font-semibold text-lg">{plan.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {plan.experienceLevel.charAt(0) + plan.experienceLevel.slice(1).toLowerCase()} level
            {" · "}
            {plan.days.length} training days
          </p>
        </div>
        {plan.active && (
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-success/10 text-success text-xs font-semibold px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Active plan
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {plan.days.map((day, i) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <p className="font-display font-semibold">{day.dayLabel}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {day.exercises.map((exercise) => (
                    <li
                      key={exercise.id}
                      className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{exercise.exerciseName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {exercise.targetMuscle}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-mono text-sm font-semibold">
                          {exercise.prescribedSets} × {exercise.prescribedReps}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" /> {exercise.restSeconds}s rest
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

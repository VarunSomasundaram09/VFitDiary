import { Link } from "react-router-dom";
import { Dumbbell, ArrowRight, Clock } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import type { UpcomingWorkout } from "@/types/dashboard";

export function UpcomingWorkoutCard({ workout }: { workout: UpcomingWorkout | null }) {
  if (!workout) {
    return (
      <Card>
        <EmptyState
          icon={Dumbbell}
          title="No workout scheduled"
          description="Generate a workout plan to see what's next on your calendar."
          actionLabel="Generate a plan"
          onAction={() => {}}
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <p className="font-display font-semibold">Upcoming workout</p>
        <Link
          to="/workouts"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          View plan <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Clock className="h-3.5 w-3.5" />
          {workout.scheduledFor}
        </div>
        <p className="font-semibold text-sm mb-3">{workout.dayLabel}</p>
        <ul className="space-y-2">
          {workout.exercises.map((exercise) => (
            <li
              key={exercise}
              className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {exercise}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

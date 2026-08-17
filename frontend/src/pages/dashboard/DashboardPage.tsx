import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Scale, Target, Flame, Zap, ArrowRight } from "lucide-react";
import { fetchDashboardSummary } from "@/services/dashboardService";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { WeeklyProgressChart } from "@/components/dashboard/WeeklyProgressChart";
import { UpcomingWorkoutCard } from "@/components/dashboard/UpcomingWorkoutCard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchDashboardSummary,
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <WelcomeCard quote={data.quote} />

      {!data.hasAssessment && (
        <Card className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-medium text-sm">Complete your Body Assessment</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your weight, goal, and calorie targets will show up here once it's done.
            </p>
          </div>
          <Link to="/assessment">
            <Button size="sm">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Scale}
          label="Current weight"
          value={data.currentWeightKg ?? 0}
          unit={data.currentWeightKg !== null ? "kg" : undefined}
          decimals={1}
          accent="primary"
          delay={0}
        />
        <StatCard
          icon={Target}
          label="Goal weight"
          value={data.goalWeightKg ?? 0}
          unit={data.goalWeightKg !== null ? "kg" : undefined}
          decimals={1}
          accent="secondary"
          delay={0.05}
        />
        <StatCard
          icon={Flame}
          label="Workout streak"
          value={data.streakDays}
          unit="days"
          accent="warning"
          trend={
            data.longestStreakDays > 0
              ? { value: `best ${data.longestStreakDays}`, positive: true }
              : undefined
          }
          delay={0.1}
        />
        <StatCard
          icon={Zap}
          label="Maintenance calories"
          value={data.maintenanceCalories ?? 0}
          unit={data.maintenanceCalories !== null ? "kcal" : undefined}
          accent="success"
          delay={0.15}
        />
      </div>

      <QuickActions />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyProgressChart data={data.weeklyVolume} />
        </div>
        <UpcomingWorkoutCard workout={data.upcomingWorkout} />
      </div>
    </div>
  );
}

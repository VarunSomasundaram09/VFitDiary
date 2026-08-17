import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Activity, Flame, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { AssessmentResult, FitnessGoal } from "@/types/assessment";

ChartJS.register(ArcElement, Tooltip, Legend);

const GOAL_ICON: Record<FitnessGoal, typeof TrendingDown> = {
  CUT: TrendingDown,
  MAINTAIN: Minus,
  BULK: TrendingUp,
};

export function AssessmentResults({ result }: { result: AssessmentResult }) {
  const goal = result.fitnessGoal ?? "MAINTAIN";
  const GoalIcon = GOAL_ICON[goal];

  const recommendedCalories =
    goal === "CUT" ? result.cutCalories : goal === "BULK" ? result.bulkCalories : result.maintenanceCalories;

  const compositionData = {
    labels: ["Lean mass", "Fat mass"],
    datasets: [
      {
        data: [result.leanBodyMassKg, result.fatMassKg],
        backgroundColor: ["#4F46E5", "#F59E0B"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid sm:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader className="pb-0">
            <p className="font-display font-semibold">Body composition</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {result.bodyFatPercentage}% body fat
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <Doughnut
                data={compositionData}
                options={{
                  cutout: "70%",
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-center">
              <div>
                <p className="font-mono text-lg font-semibold text-primary">{result.leanBodyMassKg} kg</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Lean mass</p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-warning">{result.fatMassKg} kg</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fat mass</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <p className="font-display font-semibold">Key numbers</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">BMI category: {result.bmiCategory}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">BMI</span>
              </div>
              <span className="font-mono font-semibold">{result.bmi}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 dark:bg-secondary-900/30 text-secondary">
                  <Flame className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">BMR</span>
              </div>
              <span className="font-mono font-semibold">{result.bmr} kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
                  <GoalIcon className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Maintenance</span>
              </div>
              <span className="font-mono font-semibold">{result.maintenanceCalories} kcal</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
          <p className="text-sm text-white/80">Your daily target ({goal.toLowerCase()})</p>
          <p className="font-mono text-4xl font-bold mt-1">{recommendedCalories} <span className="text-lg font-normal">kcal/day</span></p>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-xs text-white/70">Cut</p>
              <p className="font-mono font-semibold">{result.cutCalories}</p>
            </div>
            <div>
              <p className="text-xs text-white/70">Maintain</p>
              <p className="font-mono font-semibold">{result.maintenanceCalories}</p>
            </div>
            <div>
              <p className="text-xs text-white/70">Bulk</p>
              <p className="font-mono font-semibold">{result.bulkCalories}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

import { TrendingDown, Minus, TrendingUp } from "lucide-react";
import { FITNESS_GOAL_OPTIONS, type FitnessGoal } from "@/types/assessment";
import { cn } from "@/utils/cn";

const ICONS: Record<FitnessGoal, typeof TrendingDown> = {
  CUT: TrendingDown,
  MAINTAIN: Minus,
  BULK: TrendingUp,
};

interface FitnessGoalSelectorProps {
  value: FitnessGoal | undefined;
  onChange: (value: FitnessGoal) => void;
  error?: string;
}

export function FitnessGoalSelector({ value, onChange, error }: FitnessGoalSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        Your goal
      </label>
      <div className="grid grid-cols-3 gap-3">
        {FITNESS_GOAL_OPTIONS.map((option) => {
          const Icon = ICONS[option.value];
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary-50 dark:bg-primary-900/30"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-slate-400")} />
              <span className={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-slate-700 dark:text-slate-300")}>
                {option.label}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

import { Minus, Plus } from "lucide-react";

interface DaysPerWeekStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function DaysPerWeekStepper({ value, onChange, min = 2, max = 6 }: DaysPerWeekStepperProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        Days per week
      </label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Decrease days per week"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-mono text-2xl font-semibold w-10 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Increase days per week"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

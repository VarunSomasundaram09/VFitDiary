import { Repeat, ArrowUpDown, Grid3x3 } from "lucide-react";
import { SPLIT_TYPE_OPTIONS, type SplitType } from "@/types/workout";
import { cn } from "@/utils/cn";

const ICONS: Record<SplitType, typeof Repeat> = {
  PUSH_PULL_LEGS: Repeat,
  UPPER_LOWER: ArrowUpDown,
  FULL_BODY: Grid3x3,
  CUSTOM: Grid3x3,
};

interface SplitTypeSelectorProps {
  value: SplitType | undefined;
  onChange: (value: SplitType) => void;
}

export function SplitTypeSelector({ value, onChange }: SplitTypeSelectorProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {SPLIT_TYPE_OPTIONS.map((option) => {
        const Icon = ICONS[option.value];
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-start gap-2.5 rounded-2xl border-2 p-4 text-left transition-all duration-200",
              isSelected
                ? "border-primary bg-primary-50 dark:bg-primary-900/30"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-surface-card"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                isSelected ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-slate-800 dark:text-slate-200")}>
                {option.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                {option.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

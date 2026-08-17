import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4 flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isComplete && "bg-primary text-white",
                  isActive && "bg-primary-50 dark:bg-primary-900/30 text-primary border-2 border-primary",
                  !isComplete && !isActive && "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}
              >
                {isComplete ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "hidden sm:inline text-sm font-medium",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-400"
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 transition-colors",
                  isComplete ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

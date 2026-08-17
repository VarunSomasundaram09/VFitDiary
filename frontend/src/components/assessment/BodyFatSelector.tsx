import { motion } from "framer-motion";
import { BodySilhouette } from "@/components/assessment/BodySilhouette";
import { BODY_FAT_OPTIONS, type Gender } from "@/types/assessment";
import { cn } from "@/utils/cn";

interface BodyFatSelectorProps {
  gender: Gender;
  value: number | null;
  onChange: (value: number) => void;
}

export function BodyFatSelector({ gender, value, onChange }: BodyFatSelectorProps) {
  const options = BODY_FAT_OPTIONS[gender === "FEMALE" ? "FEMALE" : "MALE"];

  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Pick the range that looks closest to your build. This is a starting
        point — you can always refine it as you go.
      </p>
      <div className="grid grid-cols-4 gap-3">
        {options.map((percentage, index) => {
          const isSelected = value === percentage;
          const leannessRank = index / (options.length - 1);
          return (
            <motion.button
              key={percentage}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(percentage)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary-50 dark:bg-primary-900/30 shadow-glow"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              <div
                className={cn(
                  "h-16 w-12 sm:h-20 sm:w-14",
                  isSelected ? "text-primary" : "text-slate-400 dark:text-slate-500"
                )}
              >
                <BodySilhouette
                  gender={gender === "FEMALE" ? "FEMALE" : "MALE"}
                  leannessRank={leannessRank}
                  selected={isSelected}
                />
              </div>
              <span
                className={cn(
                  "font-mono text-sm font-semibold",
                  isSelected ? "text-primary" : "text-slate-600 dark:text-slate-400"
                )}
              >
                {percentage}%
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

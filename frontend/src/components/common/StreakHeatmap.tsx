import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Deterministic pseudo-random intensity per cell so the heatmap looks
// like real workout history rather than literal random noise on every render.
function intensityFor(index: number): number {
  const pattern = [0, 2, 3, 1, 0, 4, 3, 2, 1, 0, 2, 3, 4, 3, 1, 0, 0, 2, 3, 4];
  return pattern[index % pattern.length];
}

const INTENSITY_CLASSES = [
  "bg-slate-100 dark:bg-slate-800",
  "bg-primary-100 dark:bg-primary-900",
  "bg-primary-300 dark:bg-primary-700",
  "bg-primary-500",
  "bg-primary-600 shadow-glow",
];

const WEEKS = 12;
const DAYS = 7;
const TOTAL_CELLS = WEEKS * DAYS;

export function StreakHeatmap() {
  const [visibleCells, setVisibleCells] = useState(0);

  useEffect(() => {
    if (visibleCells >= TOTAL_CELLS) return;
    const timer = setTimeout(() => setVisibleCells((v) => v + 3), 12);
    return () => clearTimeout(timer);
  }, [visibleCells]);

  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
      role="img"
      aria-label="Workout streak heatmap, 12 weeks of activity"
    >
      {Array.from({ length: WEEKS }).map((_, w) =>
        Array.from({ length: DAYS }).map((_, d) => {
          const index = w * DAYS + d;
          const level = intensityFor(index);
          const isVisible = index < visibleCells;
          return (
            <div
              key={`${w}-${d}`}
              className={`h-2.5 w-2.5 rounded-[3px] transition-colors duration-300 ${
                isVisible ? INTENSITY_CLASSES[level] : "bg-slate-100 dark:bg-slate-800 opacity-0"
              }`}
              style={
                isVisible
                  ? { animation: "cell-pop 0.3s ease-out both" }
                  : undefined
              }
            />
          );
        })
      )}
    </div>
  );
}

export function HeroDashboardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="relative animate-float"
    >
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card shadow-card p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Workout streak
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-mono text-2xl font-semibold text-slate-900 dark:text-white"
            >
              12<span className="text-warning">🔥</span>
              <span className="text-sm font-normal text-slate-400 ml-1">days</span>
            </motion.p>
          </div>
          <div className="rounded-full bg-success/10 text-success text-xs font-semibold px-3 py-1.5">
            +18% this week
          </div>
        </div>

        <StreakHeatmap />

        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
          {[
            { label: "Volume", value: "24.6k", unit: "kg" },
            { label: "Sessions", value: "38", unit: "mo" },
            { label: "Est. 1RM", value: "142", unit: "kg" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
                {stat.value}
                <span className="text-xs text-slate-400 ml-0.5">{stat.unit}</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

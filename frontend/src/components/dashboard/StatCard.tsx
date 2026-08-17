import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  accent?: "primary" | "secondary" | "success" | "warning" | "danger";
  trend?: { value: string; positive: boolean };
  delay?: number;
}

const ACCENT_CLASSES: Record<NonNullable<StatCardProps["accent"]>, string> = {
  primary: "text-primary bg-primary-50 dark:bg-primary-900/30",
  secondary: "text-secondary bg-secondary-50 dark:bg-secondary-900/30",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
};

function useCountUp(target: number, decimals: number, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value.toFixed(decimals);
}

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  decimals = 0,
  accent = "primary",
  trend,
  delay = 0,
}: StatCardProps) {
  const animatedValue = useCountUp(value, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ACCENT_CLASSES[accent])}>
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          {trend && (
            <span
              className={cn(
                "text-xs font-semibold rounded-full px-2 py-0.5",
                trend.positive ? "text-success bg-success/10" : "text-danger bg-danger/10"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
        <p className="mt-4 font-mono text-2xl font-semibold text-slate-900 dark:text-white">
          {animatedValue}
          {unit && <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      </Card>
    </motion.div>
  );
}

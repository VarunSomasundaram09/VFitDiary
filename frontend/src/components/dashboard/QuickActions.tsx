import { Link } from "react-router-dom";
import { PlusCircle, Scale, Dumbbell, LineChart } from "lucide-react";

const ACTIONS = [
  { label: "Log workout", icon: PlusCircle, path: "/tracker", accent: "text-primary bg-primary-50 dark:bg-primary-900/30" },
  { label: "Update weight", icon: Scale, path: "/assessment", accent: "text-secondary bg-secondary-50 dark:bg-secondary-900/30" },
  { label: "View plan", icon: Dumbbell, path: "/workouts", accent: "text-warning bg-warning/10" },
  { label: "See progress", icon: LineChart, path: "/progress", accent: "text-success bg-success/10" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {ACTIONS.map((action) => (
        <Link
          key={action.label}
          to={action.path}
          className="flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card p-4 text-center hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.accent}`}>
            <action.icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}

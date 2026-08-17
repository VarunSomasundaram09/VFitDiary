import { Menu, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

const THEME_OPTIONS = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

export function Topbar({ onMenuClick, title }: TopbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-lg px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1.5 text-slate-500"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display font-semibold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 p-1">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={`Use ${opt.label.toLowerCase()} theme`}
            aria-pressed={theme === opt.value}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              theme === opt.value
                ? "bg-white dark:bg-surface-card shadow-soft text-primary"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <opt.icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </header>
  );
}

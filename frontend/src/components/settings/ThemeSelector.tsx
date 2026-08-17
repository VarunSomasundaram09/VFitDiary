import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/cn";

const OPTIONS: { value: Theme; label: string; description: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", description: "Bright and clean", icon: Sun },
  { value: "dark", label: "Dark", description: "Easy on the eyes", icon: Moon },
  { value: "system", label: "System", description: "Match your device", icon: Monitor },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-3">
      {OPTIONS.map((option) => {
        const isSelected = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-all duration-200",
              isSelected
                ? "border-primary bg-primary-50 dark:bg-primary-900/30"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            )}
          >
            <option.icon className={cn("h-6 w-6", isSelected ? "text-primary" : "text-slate-400")} />
            <span className={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-slate-700 dark:text-slate-300")}>
              {option.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}

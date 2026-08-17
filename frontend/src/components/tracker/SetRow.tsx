import { Trash2 } from "lucide-react";
import type { SetInput } from "@/types/tracker";

interface SetRowProps {
  set: SetInput;
  onChange: (localId: string, field: "weightKg" | "reps", value: string) => void;
  onRemove: (localId: string) => void;
  canRemove: boolean;
}

export function SetRow({ set, onChange, onRemove, canRemove }: SetRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm font-medium text-slate-500">
        {set.setNumber}
      </span>
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="number"
            step="0.5"
            placeholder="Weight"
            value={set.weightKg}
            onChange={(e) => onChange(set.localId, "weightKg", e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-surface-card px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">kg</span>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Reps"
            value={set.reps}
            onChange={(e) => onChange(set.localId, "reps", e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-surface-card px-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">reps</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(set.localId)}
        disabled={!canRemove}
        className="text-slate-400 hover:text-danger disabled:opacity-30 disabled:hover:text-slate-400 transition-colors flex-shrink-0"
        aria-label="Remove set"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

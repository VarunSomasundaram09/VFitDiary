import { getPasswordStrength } from "@/utils/validation";

const LABELS = ["Weak", "Fair", "Good", "Strong", "Excellent"];
const COLORS = ["bg-danger", "bg-warning", "bg-warning", "bg-success", "bg-success"];

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < strength ? COLORS[strength] : "bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {LABELS[strength]}
      </p>
    </div>
  );
}

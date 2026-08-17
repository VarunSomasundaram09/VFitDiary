import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, TrendingUp, Flame } from "lucide-react";
import { StreakHeatmap } from "@/components/common/StreakHeatmap";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Your data stays private, always" },
  { icon: TrendingUp, text: "Every metric backed by real formulas" },
  { icon: Flame, text: "Free forever for core tracking" },
];

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface-light dark:bg-surface-dark">
      {/* Branded panel */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-primary to-secondary p-12 text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,#000_40%,transparent_100%)]" />

        <Link to="/" className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Activity className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold">vfitdiary</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-3xl font-display font-bold leading-tight text-balance">
            Consistency, made visible.
          </h2>
          <p className="mt-3 text-white/80 max-w-sm text-balance">
            Every session you log builds a picture you can actually act on.
          </p>

          <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5">
            <p className="text-xs text-white/70 mb-3">Your streak, from day one</p>
            <div className="opacity-90">
              <StreakHeatmap />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {TRUST_POINTS.map((point) => (
              <div key={point.text} className="flex items-center gap-2.5 text-sm text-white/85">
                <point.icon className="h-4 w-4 flex-shrink-0" />
                {point.text}
              </div>
            ))}
          </div>
        </motion.div>

        <p className="relative text-xs text-white/60">
          © {new Date().getFullYear()} vfitdiary
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-bold">vfitdiary</span>
          </Link>

          <h1 className="text-2xl font-display font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

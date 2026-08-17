import { motion } from "framer-motion";
import { TrendingUp, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";

function DashboardMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Today's overview</p>
        <span className="text-[11px] text-slate-400">Mon, Jul 3</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: "Weight", value: "78.4 kg", accent: "text-primary" },
          { label: "Calories left", value: "612", accent: "text-warning" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3"
          >
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className={`font-mono font-semibold text-base ${s.accent}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3.5 text-white">
        <p className="text-[11px] opacity-80">Today's push day</p>
        <p className="text-sm font-semibold mt-0.5">Bench · Incline DB · OHP</p>
      </div>
    </div>
  );
}

function TrackerMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Barbell Bench Press</p>
        <Plus className="h-4 w-4 text-primary" />
      </div>
      {[
        { set: 1, weight: "80", reps: "8", prev: "77.5" },
        { set: 2, weight: "80", reps: "7", prev: "77.5" },
        { set: 3, weight: "77.5", reps: "8", prev: "75" },
      ].map((row) => (
        <div
          key={row.set}
          className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs"
        >
          <span className="text-slate-400 font-mono">#{row.set}</span>
          <span className="font-mono font-medium">{row.weight} kg × {row.reps}</span>
          <span className="text-slate-400">prev {row.prev}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 text-success text-xs font-medium pt-1">
        <TrendingUp className="h-3.5 w-3.5" /> Est. 1RM up 4.2% this month
      </div>
    </div>
  );
}

function ProgressMock() {
  const points = [40, 55, 45, 60, 52, 70, 65, 80, 74, 88];
  const max = Math.max(...points);
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Volume — last 10 sessions</p>
      <div className="flex items-end gap-1.5 h-24">
        {points.map((p, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-secondary"
            style={{ height: `${(p / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>3 weeks ago</span>
        <span>today</span>
      </div>
    </div>
  );
}

const PANELS = [
  { title: "Dashboard", subtitle: "Your day, at a glance", Mock: DashboardMock },
  { title: "Workout Tracker", subtitle: "Log sets in seconds", Mock: TrackerMock },
  { title: "Progress", subtitle: "See the trend, not just the number", Mock: ProgressMock },
];

export function Screenshots() {
  return (
    <section id="screenshots" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wide"
          >
            Inside the app
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-balance"
          >
            Designed to disappear into your workout
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PANELS.map((panel, i) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-5 hover:shadow-card transition-shadow duration-300">
                <div className="mb-4">
                  <p className="font-display font-semibold">{panel.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {panel.subtitle}
                  </p>
                </div>
                <div className="rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 p-4">
                  <panel.Mock />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

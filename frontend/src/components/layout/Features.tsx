import { motion } from "framer-motion";
import {
  Scale,
  Dumbbell,
  LineChart,
  Flame,
  Trophy,
  CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    icon: Scale,
    title: "Body assessment that's actually accurate",
    description:
      "Pick your body-fat range from real reference photos, not a guess. Get your BMI, BMR, lean mass, and calorie targets instantly.",
    color: "text-primary bg-primary-50 dark:bg-primary-900/30",
  },
  {
    icon: Dumbbell,
    title: "Workout plans built around you",
    description:
      "Push/Pull/Legs, Upper/Lower, or Full Body — generated for your experience level, with sets, reps, and rest baked in.",
    color: "text-secondary bg-secondary-50 dark:bg-secondary-900/30",
  },
  {
    icon: LineChart,
    title: "Progress you can actually see",
    description:
      "Weight trends, workout volume, and estimated 1RM — charted over time so you know what's working.",
    color: "text-success bg-success/10",
  },
  {
    icon: Flame,
    title: "Streaks that keep you honest",
    description:
      "A GitHub-style heatmap of every session logged. Watch your consistency build, day by day.",
    color: "text-warning bg-warning/10",
  },
  {
    icon: Trophy,
    title: "Personal records, tracked automatically",
    description:
      "Every set you log is checked against your bests. Bench, squat, deadlift — your PRs update themselves.",
    color: "text-danger bg-danger/10",
  },
  {
    icon: CalendarDays,
    title: "A calendar that tells the whole story",
    description:
      "See your training history at a glance, with longest streaks and monthly summaries front and center.",
    color: "text-primary bg-primary-50 dark:bg-primary-900/30",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wide"
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-balance"
          >
            One app, replacing four spreadsheets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-slate-600 dark:text-slate-300 text-balance"
          >
            Built for people who take training seriously, without the
            complexity of a coaching platform.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card className="h-full p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.color} mb-4`}
                >
                  <feature.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

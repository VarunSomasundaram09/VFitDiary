import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Tell us where you're starting",
    description:
      "Age, height, weight, activity level, and a body-fat range picked from reference photos — takes under two minutes.",
  },
  {
    number: "02",
    title: "Get a plan built for your goal",
    description:
      "Cutting, maintaining, or bulking — your calorie targets and a full workout split are generated instantly.",
  },
  {
    number: "03",
    title: "Log sessions, watch the trend",
    description:
      "Track weight and reps as you train. Your streak, volume, and PRs update themselves — no manual math.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wide"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-balance"
          >
            From first login to first PR
          </motion.h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="relative z-10 mx-auto md:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-surface-card border border-slate-200 dark:border-slate-800 shadow-soft font-mono font-semibold text-primary text-lg">
                {step.number}
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-center md:text-left">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

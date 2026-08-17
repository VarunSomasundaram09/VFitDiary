import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Is vfitdiary free to use?",
    answer:
      "Yes. Core tracking — body assessment, workout plans, logging, streaks, and progress charts — is free forever. No credit card required to sign up.",
  },
  {
    question: "How is body fat percentage estimated?",
    answer:
      "Instead of asking you to type in a number you're probably guessing at, you pick the reference photo that most closely matches your build. It's a fast, honest starting point — you can always refine it later as your results come in.",
  },
  {
    question: "Can I use my own workout plan instead of the generator?",
    answer:
      "Yes. Generated plans are a starting point — every exercise, set, and rep target is fully editable, and you can build a plan from scratch if you prefer.",
  },
  {
    question: "What's an estimated 1RM, and how is it calculated?",
    answer:
      "Your estimated one-rep max is calculated from the weight and reps you log using the Epley formula. It updates automatically every time you log a new set.",
  },
  {
    question: "Will there be a mobile app?",
    answer:
      "vfitdiary is fully responsive and works well on mobile browsers today. A dedicated mobile app is on the roadmap.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40">
      <div className="container max-w-3xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wide"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl md:text-4xl font-bold tracking-tight"
          >
            Questions, answered
          </motion.h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

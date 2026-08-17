import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Small reprise of the heatmap motif from the hero — ties the identity together.
function MiniDots() {
  const levels = [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 4, 3, 1, 0, 2, 3, 4, 2, 1, 0];
  const shades = [
    "bg-white/10",
    "bg-white/25",
    "bg-white/45",
    "bg-white/70",
    "bg-white",
  ];
  return (
    <div className="flex gap-1.5 justify-center mb-6">
      {levels.map((l, i) => (
        <div key={i} className={`h-2 w-2 rounded-sm ${shades[l]}`} />
      ))}
    </div>
  );
}

export function CTABanner() {
  return (
    <section className="py-24 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-8 py-16 md:py-20 text-center"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
          <div className="relative">
            <MiniDots />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance max-w-xl mx-auto">
              Your streak starts with today's set
            </h2>
            <p className="mt-4 text-white/80 max-w-md mx-auto text-balance">
              Free to start, no credit card, set up in under two minutes.
            </p>
            <Link to="/signup" className="inline-block mt-8">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-none group"
              >
                Start tracking free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

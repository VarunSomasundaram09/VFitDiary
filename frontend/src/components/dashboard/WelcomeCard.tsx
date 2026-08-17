import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { MotivationalQuote } from "@/types/dashboard";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeCard({ quote }: { quote: MotivationalQuote }) {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 text-white"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_0%,#000_40%,transparent_100%)]" />
      <div className="relative">
        <h2 className="text-2xl font-display font-bold">
          {getGreeting()}, {firstName} 👋
        </h2>
        <div className="mt-4 flex items-start gap-2.5 max-w-lg">
          <Quote className="h-4 w-4 flex-shrink-0 mt-1 text-white/70" />
          <p className="text-white/90 text-sm sm:text-base text-balance">
            "{quote.text}"
            {quote.author && <span className="text-white/70"> — {quote.author}</span>}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

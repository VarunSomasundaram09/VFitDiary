import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import type { ToastVariant } from "@/contexts/ToastContext";
import { cn } from "@/utils/cn";

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; classes: string }
> = {
  success: { icon: CheckCircle2, classes: "text-success bg-success/10" },
  error: { icon: XCircle, classes: "text-danger bg-danger/10" },
  info: { icon: Info, classes: "text-primary bg-primary-50 dark:bg-primary-900/30" },
  warning: { icon: AlertTriangle, classes: "text-warning bg-warning/10" },
};

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2.5 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = VARIANT_CONFIG[toast.variant];
          const Icon = config.icon;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card shadow-card p-4"
            >
              <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", config.classes)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

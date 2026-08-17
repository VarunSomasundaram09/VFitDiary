import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, LogOut, X } from "lucide-react";
import { DASHBOARD_NAV } from "@/utils/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2 px-6 h-16 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
          <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-bold">vfitdiary</span>
      </Link>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {DASHBOARD_NAV.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              )}
            >
              <item.icon className="h-4.5 w-4.5" strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold flex-shrink-0">
            {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{user?.fullName ?? "User"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={() => logout()}
            aria-label="Log out"
            className="text-slate-400 hover:text-danger transition-colors flex-shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-card">
        <div className="fixed w-64 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-card lg:hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-3 p-1.5 text-slate-400"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

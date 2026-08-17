import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { DASHBOARD_NAV } from "@/utils/navigation";

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const currentTitle =
    DASHBOARD_NAV.find((item) => item.path === location.pathname)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="flex">
        <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        <div className="flex-1 min-w-0 lg:ml-64">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} title={currentTitle} />
          <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

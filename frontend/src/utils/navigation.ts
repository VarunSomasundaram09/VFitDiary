import {
  LayoutDashboard,
  Scale,
  Dumbbell,
  ClipboardList,
  LineChart,
  CalendarDays,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Body Assessment", path: "/assessment", icon: Scale },
  { label: "Workout Generator", path: "/workouts", icon: Dumbbell },
  { label: "Workout Tracker", path: "/tracker", icon: ClipboardList },
  { label: "Progress", path: "/progress", icon: LineChart },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
  { label: "Settings", path: "/settings", icon: Settings },
];

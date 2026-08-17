import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastViewport } from "@/components/common/ToastViewport";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { queryClient } from "@/services/queryClient";

// Route-level code splitting: each page ships as its own chunk, loaded
// on demand. Keeps the initial bundle small even as the app grows —
// worth doing now that all 10 modules exist and the bundle is sizable.
const LandingPage = lazy(() => import("@/pages/landing/LandingPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const AssessmentPage = lazy(() => import("@/pages/assessment/AssessmentPage"));
const WorkoutGeneratorPage = lazy(() => import("@/pages/workouts/WorkoutGeneratorPage"));
const TrackerPage = lazy(() => import("@/pages/tracker/TrackerPage"));
const ProgressPage = lazy(() => import("@/pages/progress/ProgressPage"));
const CalendarPage = lazy(() => import("@/pages/calendar/CalendarPage"));
const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/assessment" element={<AssessmentPage />} />
                  <Route path="/workouts" element={<WorkoutGeneratorPage />} />
                  <Route path="/tracker" element={<TrackerPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<ComingSoon title="Page not found" />} />
              </Routes>
            </Suspense>
            <ToastViewport />
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

import { format, subDays } from "date-fns";
import { profileService } from "@/services/profileService";
import { assessmentService } from "@/services/assessmentService";
import { workoutPlanService } from "@/services/workoutPlanService";
import { calendarService } from "@/services/calendarService";
import { progressService } from "@/services/progressService";
import { quoteService } from "@/services/quoteService";
import type { DashboardSummary } from "@/types/dashboard";

const FALLBACK_QUOTE = { text: "Small steps every day lead to big changes.", author: null };
const WEEK_LABELS_LOOKBACK = 7;

/**
 * Aggregates data owned by several backend modules (Profile, Body
 * Assessment, Workout Plans, Calendar, Progress, Quotes) into one
 * dashboard-shaped response. Each source is fetched independently via
 * allSettled so a brand-new user with no assessment/plan/history yet
 * still gets a working dashboard instead of one failed call breaking
 * the whole page.
 */
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const [profileResult, assessmentResult, planResult, streaksResult, volumeResult, quoteResult] =
    await Promise.allSettled([
      profileService.getProfile(),
      assessmentService.getLatest(),
      workoutPlanService.getActive(),
      calendarService.getStreaks(),
      progressService.getVolumeHistory(WEEK_LABELS_LOOKBACK),
      quoteService.getRandom(),
    ]);

  const profile = profileResult.status === "fulfilled" ? profileResult.value : null;
  const assessment = assessmentResult.status === "fulfilled" ? assessmentResult.value : null;
  const plan = planResult.status === "fulfilled" ? planResult.value : null;
  const streaks =
    streaksResult.status === "fulfilled" ? streaksResult.value : { currentStreak: 0, longestStreak: 0 };
  const volumeHistory = volumeResult.status === "fulfilled" ? volumeResult.value : [];
  const quote = quoteResult.status === "fulfilled" ? quoteResult.value : FALLBACK_QUOTE;

  // Build the last 7 calendar days (including today), filling in real
  // volume where it exists and zero where it doesn't, so the chart
  // always shows a full week rather than only the days with data.
  const volumeByDate = new Map(volumeHistory.map((v) => [v.date, v.totalVolumeKg]));
  const weeklyVolume = Array.from({ length: WEEK_LABELS_LOOKBACK }).map((_, i) => {
    const date = subDays(new Date(), WEEK_LABELS_LOOKBACK - 1 - i);
    const key = format(date, "yyyy-MM-dd");
    return { label: format(date, "EEE"), volumeKg: volumeByDate.get(key) ?? 0 };
  });

  const firstPlanDay = plan?.days?.[0] ?? null;

  return {
    quote,
    hasAssessment: !!assessment,
    currentWeightKg: profile?.currentWeightKg ?? null,
    goalWeightKg: profile?.goalWeightKg ?? null,
    maintenanceCalories: assessment?.maintenanceCalories ?? null,
    streakDays: streaks.currentStreak,
    longestStreakDays: streaks.longestStreak,
    weeklyVolume,
    upcomingWorkout: firstPlanDay
      ? {
          dayLabel: firstPlanDay.dayLabel,
          scheduledFor: "Next in your plan",
          exercises: firstPlanDay.exercises.map((e) => e.exerciseName),
        }
      : null,
  };
}

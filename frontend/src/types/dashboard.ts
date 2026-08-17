export interface MotivationalQuote {
  text: string;
  author: string | null;
}

export interface WeeklyVolumePoint {
  label: string;
  volumeKg: number;
}

export interface UpcomingWorkout {
  dayLabel: string;
  scheduledFor: string;
  exercises: string[];
}

export interface DashboardSummary {
  quote: MotivationalQuote;
  hasAssessment: boolean;
  currentWeightKg: number | null;
  goalWeightKg: number | null;
  maintenanceCalories: number | null;
  streakDays: number;
  longestStreakDays: number;
  weeklyVolume: WeeklyVolumePoint[];
  upcomingWorkout: UpcomingWorkout | null;
}

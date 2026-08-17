export interface CalendarDay {
  date: string;
  totalVolumeKg: number;
  workoutCount: number;
}

export interface Streaks {
  currentStreak: number;
  longestStreak: number;
}

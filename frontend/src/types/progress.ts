export interface WeightEntry {
  id: number;
  entryDate: string;
  weightKg: number;
  bodyFatPercentage: number | null;
  notes: string | null;
}

export interface LogWeightPayload {
  entryDate?: string;
  weightKg: number;
  bodyFatPercentage?: number;
  notes?: string;
}

export interface VolumePoint {
  date: string;
  totalVolumeKg: number;
  workoutCount: number;
}

export interface PersonalRecord {
  id: number;
  exerciseId: number;
  exerciseName: string;
  targetMuscle: string;
  bestWeightKg: number;
  bestReps: number;
  estimated1rm: number;
  achievedAt: string;
}

/** The brief's three "hero" lifts — matched by name against whatever the user has actually logged. */
export const HERO_LIFTS = ["Barbell Bench Press", "Back Squat", "Deadlift"];

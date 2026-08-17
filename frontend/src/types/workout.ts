export type SplitType = "PUSH_PULL_LEGS" | "UPPER_LOWER" | "FULL_BODY" | "CUSTOM";
export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface GeneratePlanPayload {
  splitType: SplitType;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
}

export interface PlanExercise {
  id: number;
  exerciseId: number;
  exerciseName: string;
  targetMuscle: string;
  prescribedSets: number;
  prescribedReps: string;
  restSeconds: number;
}

export interface PlanDay {
  id: number;
  dayLabel: string;
  dayOrder: number;
  exercises: PlanExercise[];
}

export interface WorkoutPlan {
  id: number;
  name: string;
  splitType: SplitType;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  active: boolean;
  days: PlanDay[];
  createdAt: string;
}

export const SPLIT_TYPE_OPTIONS: { value: SplitType; label: string; description: string }[] = [
  { value: "PUSH_PULL_LEGS", label: "Push / Pull / Legs", description: "Classic 3-way split, great for 3 or 6 days/week" },
  { value: "UPPER_LOWER", label: "Upper / Lower", description: "Balanced split, works well for 2 or 4 days/week" },
  { value: "FULL_BODY", label: "Full Body", description: "Every session hits everything — ideal for 3 days/week" },
];

export const EXPERIENCE_LEVEL_OPTIONS: { value: ExperienceLevel; label: string; description: string }[] = [
  { value: "BEGINNER", label: "Beginner", description: "New to structured training" },
  { value: "INTERMEDIATE", label: "Intermediate", description: "6+ months of consistent training" },
  { value: "ADVANCED", label: "Advanced", description: "Years of training, comfortable with heavy compounds" },
];

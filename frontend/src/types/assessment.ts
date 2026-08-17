export type Gender = "MALE" | "FEMALE" | "OTHER";
export type ActivityLevel = "SEDENTARY" | "LIGHT" | "MODERATE" | "ACTIVE" | "VERY_ACTIVE";
export type FitnessGoal = "CUT" | "MAINTAIN" | "BULK";

export interface AssessmentPayload {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goalWeightKg?: number;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  bodyFatPercentage: number;
}

export interface AssessmentResult {
  id: number;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number | null;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal | null;
  bodyFatPercentage: number;
  bmi: number;
  bmiCategory: string;
  bmr: number;
  maintenanceCalories: number;
  cutCalories: number;
  bulkCalories: number;
  leanBodyMassKg: number;
  fatMassKg: number;
  assessedAt: string;
}

export const ACTIVITY_LEVEL_OPTIONS: { value: ActivityLevel; label: string; description: string }[] = [
  { value: "SEDENTARY", label: "Sedentary", description: "Little to no exercise" },
  { value: "LIGHT", label: "Lightly active", description: "Light exercise 1-3 days/week" },
  { value: "MODERATE", label: "Moderately active", description: "Moderate exercise 3-5 days/week" },
  { value: "ACTIVE", label: "Active", description: "Hard exercise 6-7 days/week" },
  { value: "VERY_ACTIVE", label: "Very active", description: "Physical job or 2x/day training" },
];

export const FITNESS_GOAL_OPTIONS: { value: FitnessGoal; label: string; description: string }[] = [
  { value: "CUT", label: "Cut", description: "Lose fat, preserve muscle" },
  { value: "MAINTAIN", label: "Maintain", description: "Stay at current weight" },
  { value: "BULK", label: "Bulk", description: "Build muscle, gain weight" },
];

export const BODY_FAT_OPTIONS: Record<"MALE" | "FEMALE", number[]> = {
  MALE: [8, 10, 15, 20, 25, 30, 35, 40],
  FEMALE: [12, 15, 20, 25, 30, 35, 40, 45],
};

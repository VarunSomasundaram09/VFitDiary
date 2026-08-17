import { api } from "@/services/api";
import type { ActivityLevel, FitnessGoal, Gender } from "@/types/assessment";

export interface Profile {
  age: number | null;
  gender: Gender | null;
  heightCm: number | null;
  currentWeightKg: number | null;
  goalWeightKg: number | null;
  activityLevel: ActivityLevel | null;
  fitnessGoal: FitnessGoal | null;
  bodyFatPercentage: number | null;
  themePreference: "LIGHT" | "DARK" | "SYSTEM" | null;
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    const { data } = await api.get<Profile>("/profile");
    return data;
  },
};

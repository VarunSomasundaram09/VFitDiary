import { api } from "@/services/api";
import type { GeneratePlanPayload, WorkoutPlan } from "@/types/workout";

export const workoutPlanService = {
  async generate(payload: GeneratePlanPayload): Promise<WorkoutPlan> {
    const { data } = await api.post<WorkoutPlan>("/workout-plans/generate", payload);
    return data;
  },

  async getActive(): Promise<WorkoutPlan> {
    const { data } = await api.get<WorkoutPlan>("/workout-plans/active");
    return data;
  },

  async getAll(): Promise<WorkoutPlan[]> {
    const { data } = await api.get<WorkoutPlan[]>("/workout-plans");
    return data;
  },
};

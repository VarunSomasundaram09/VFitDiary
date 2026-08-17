import { api } from "@/services/api";
import type { CreateWorkoutLogPayload, PreviousSet, WorkoutLogResult } from "@/types/tracker";

export const workoutLogService = {
  async create(payload: CreateWorkoutLogPayload): Promise<WorkoutLogResult> {
    const { data } = await api.post<WorkoutLogResult>("/workout-logs", payload);
    return data;
  },

  async getRecent(): Promise<WorkoutLogResult[]> {
    const { data } = await api.get<WorkoutLogResult[]>("/workout-logs/recent");
    return data;
  },

  async getPreviousSet(exerciseId: number): Promise<PreviousSet> {
    const { data } = await api.get<PreviousSet>(`/workout-logs/exercises/${exerciseId}/previous`);
    return data;
  },
};

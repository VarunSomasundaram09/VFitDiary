import { api } from "@/services/api";
import type { Exercise } from "@/types/tracker";

export const exerciseService = {
  async getAll(): Promise<Exercise[]> {
    const { data } = await api.get<Exercise[]>("/exercises");
    return data;
  },
};

import { api } from "@/services/api";
import type { LogWeightPayload, VolumePoint, WeightEntry } from "@/types/progress";

export const progressService = {
  async logWeight(payload: LogWeightPayload): Promise<WeightEntry> {
    const { data } = await api.post<WeightEntry>("/progress/weight", payload);
    return data;
  },

  async getWeightHistory(): Promise<WeightEntry[]> {
    const { data } = await api.get<WeightEntry[]>("/progress/weight-history");
    return data;
  },

  async getVolumeHistory(days = 90): Promise<VolumePoint[]> {
    const { data } = await api.get<VolumePoint[]>("/progress/volume-history", { params: { days } });
    return data;
  },
};

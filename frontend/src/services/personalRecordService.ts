import { api } from "@/services/api";
import type { PersonalRecord } from "@/types/progress";

export const personalRecordService = {
  async getAll(): Promise<PersonalRecord[]> {
    const { data } = await api.get<PersonalRecord[]>("/personal-records");
    return data;
  },
};

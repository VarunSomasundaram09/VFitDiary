import { api } from "@/services/api";
import type { AssessmentPayload, AssessmentResult } from "@/types/assessment";

export const assessmentService = {
  async submit(payload: AssessmentPayload): Promise<AssessmentResult> {
    const { data } = await api.post<AssessmentResult>("/assessments", payload);
    return data;
  },

  async getLatest(): Promise<AssessmentResult> {
    const { data } = await api.get<AssessmentResult>("/assessments/latest");
    return data;
  },

  async getHistory(): Promise<AssessmentResult[]> {
    const { data } = await api.get<AssessmentResult[]>("/assessments/history");
    return data;
  },
};

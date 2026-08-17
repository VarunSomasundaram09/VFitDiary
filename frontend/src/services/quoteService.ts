import { api } from "@/services/api";
import type { MotivationalQuote } from "@/types/dashboard";

export const quoteService = {
  async getRandom(): Promise<MotivationalQuote> {
    const { data } = await api.get<MotivationalQuote>("/quotes/random");
    return data;
  },
};

import { api } from "@/services/api";
import type { CalendarDay, Streaks } from "@/types/calendar";
import type { WorkoutLogResult } from "@/types/tracker";

export const calendarService = {
  async getHeatmap(days = 365): Promise<CalendarDay[]> {
    const { data } = await api.get<CalendarDay[]>("/calendar/heatmap", { params: { days } });
    return data;
  },

  async getStreaks(): Promise<Streaks> {
    const { data } = await api.get<Streaks>("/calendar/streaks");
    return data;
  },

  async getLogsOnDate(date: string): Promise<WorkoutLogResult[]> {
    const { data } = await api.get<WorkoutLogResult[]>(`/workout-logs/on/${date}`);
    return data;
  },
};

import { api } from "@/services/api";
import type { User } from "@/types/auth";

export interface UpdateUserPayload {
  fullName: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  async updateCurrentUser(payload: UpdateUserPayload): Promise<User> {
    const { data } = await api.put<User>("/users/me", payload);
    return data;
  },
};

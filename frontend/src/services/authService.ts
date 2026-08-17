import { api, tokenStorage } from "@/services/api";
import type { AuthResponse, LoginPayload, SignupPayload } from "@/types/auth";

export const authService = {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/signup", {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    });
    tokenStorage.setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    });
    tokenStorage.setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      tokenStorage.clear();
    }
  },
};

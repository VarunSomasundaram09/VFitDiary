export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}

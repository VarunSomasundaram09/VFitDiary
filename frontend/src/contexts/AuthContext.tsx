import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { tokenStorage } from "@/services/api";
import { authService } from "@/services/authService";
import type { LoginPayload, SignupPayload, User } from "@/types/auth";

const CURRENT_USER_KEY = "vfitdiary_current_user";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Rehydrate from localStorage on load. The Settings page calls
    // updateUser() after a successful profile edit to keep this in sync
    // with GET/PUT /api/users/me without a full page reload.
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    const accessToken = tokenStorage.getAccessToken();
    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((nextUser: User) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const response = await authService.login(payload);
      persistUser(response.user);
    },
    [persistUser]
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const response = await authService.signup(payload);
      persistUser(response.user);
    },
    [persistUser]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser: persistUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

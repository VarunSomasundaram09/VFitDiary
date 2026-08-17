import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export function AccountActions() {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch {
      showToast({ variant: "error", title: "Couldn't log out. Please try again." });
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">Log out</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          You'll need to log in again to access your account.
        </p>
      </div>
      <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
        Log out
      </Button>
    </div>
  );
}

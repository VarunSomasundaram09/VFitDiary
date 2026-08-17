import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { isAxiosError } from "axios";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { userService } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import type { ApiErrorResponse } from "@/types/auth";

export function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState(user?.fullName ?? "");

  const mutation = useMutation({
    mutationFn: userService.updateCurrentUser,
    onSuccess: (updated) => {
      updateUser(updated);
      showToast({ variant: "success", title: "Profile updated" });
    },
    onError: (err) => {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Couldn't update your profile. Please try again."
        : "Couldn't update your profile. Please try again.";
      showToast({ variant: "error", title: "Something went wrong", description: message });
    },
  });

  const hasChanges = fullName.trim() !== "" && fullName !== user?.fullName;

  const handleSave = () => {
    if (!hasChanges) return;
    mutation.mutate({ fullName: fullName.trim() });
  };

  return (
    <div className="space-y-4">
      <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Input label="Email" value={user?.email ?? ""} disabled />
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!hasChanges || mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

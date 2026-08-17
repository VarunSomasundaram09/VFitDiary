import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { PhysicalStatsSummary } from "@/components/settings/PhysicalStatsSummary";
import { AccountActions } from "@/components/settings/AccountActions";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your appearance, profile, and account.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <p className="font-display font-semibold">Appearance</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose how vfitdiary looks on this device.
          </p>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <p className="font-display font-semibold">Profile</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Your account details.</p>
        </CardHeader>
        <CardContent>
          <ProfileSettings />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <p className="font-display font-semibold">Physical stats</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From your most recent Body Assessment.
          </p>
        </CardHeader>
        <CardContent>
          <PhysicalStatsSummary />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <AccountActions />
        </CardContent>
      </Card>
    </div>
  );
}

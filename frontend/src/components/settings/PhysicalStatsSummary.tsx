import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import { profileService } from "@/services/profileService";
import { EmptyState } from "@/components/common/EmptyState";

const ACTIVITY_LABELS: Record<string, string> = {
  SEDENTARY: "Sedentary",
  LIGHT: "Lightly active",
  MODERATE: "Moderately active",
  ACTIVE: "Active",
  VERY_ACTIVE: "Very active",
};

export function PhysicalStatsSummary() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });

  if (isLoading) {
    return <div className="h-24 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />;
  }

  if (!profile || !profile.heightCm) {
    return (
      <EmptyState
        icon={Scale}
        title="No assessment yet"
        description="Complete a Body Assessment to see your stats here."
        actionLabel="Go to Body Assessment"
        onAction={() => navigate("/assessment")}
      />
    );
  }

  const stats = [
    { label: "Height", value: `${profile.heightCm} cm` },
    { label: "Weight", value: `${profile.currentWeightKg} kg` },
    { label: "Goal", value: profile.goalWeightKg ? `${profile.goalWeightKg} kg` : "—" },
    { label: "Activity", value: profile.activityLevel ? ACTIVITY_LABELS[profile.activityLevel] : "—" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-lg font-semibold">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
      <Link
        to="/assessment"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
      >
        Update assessment <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

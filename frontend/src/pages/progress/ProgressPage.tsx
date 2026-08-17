import { WeightChart } from "@/components/progress/WeightChart";
import { VolumeChart } from "@/components/progress/VolumeChart";
import { PersonalRecordsTracker } from "@/components/progress/PersonalRecordsTracker";

export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Progress</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          See the trend, not just today's number.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <WeightChart />
        <VolumeChart />
      </div>

      <div>
        <h3 className="font-display font-semibold text-lg mb-4">Personal Records</h3>
        <PersonalRecordsTracker />
      </div>
    </div>
  );
}

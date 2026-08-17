import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { LineChart as VolumeIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { progressService } from "@/services/progressService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function VolumeChart() {
  const { data: volume, isLoading } = useQuery({
    queryKey: ["volume-history"],
    queryFn: () => progressService.getVolumeHistory(90),
  });

  const hasData = volume && volume.length > 0;
  const totalVolume = (volume ?? []).reduce((sum, v) => sum + v.totalVolumeKg, 0);

  const chartData = {
    labels: (volume ?? []).map((v) =>
      new Date(v.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        data: (volume ?? []).map((v) => v.totalVolumeKg),
        backgroundColor: "#7C3AED",
        borderRadius: 5,
        maxBarThickness: 22,
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <p className="font-display font-semibold">Training volume</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last 90 days</p>
        </div>
        {hasData && (
          <p className="font-mono text-sm font-semibold text-secondary">
            {totalVolume.toLocaleString()} kg total
          </p>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />
        ) : !hasData ? (
          <EmptyState
            icon={VolumeIcon}
            title="No sessions logged yet"
            description="Log a workout in the Tracker to see your volume trend here."
          />
        ) : (
          <div className="h-48">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    backgroundColor: "#1E293B",
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: { label: (ctx) => `${(ctx.parsed.y ?? 0).toLocaleString()} kg` },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
                  y: { grid: { color: "rgba(148, 163, 184, 0.15)" } },
                },
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import type { WeeklyVolumePoint } from "@/types/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const PRIMARY = "#4F46E5";
const PRIMARY_LIGHT = "#C4C8FF";

export function WeeklyProgressChart({ data }: { data: WeeklyVolumePoint[] }) {
  const totalVolume = data.reduce((sum, d) => sum + d.volumeKg, 0);
  const activeDays = data.filter((d) => d.volumeKg > 0).length;
  const maxVolume = Math.max(...data.map((x) => x.volumeKg), 0);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Volume",
        data: data.map((d) => d.volumeKg),
        backgroundColor: data.map((d) => (d.volumeKg === maxVolume && maxVolume > 0 ? PRIMARY : PRIMARY_LIGHT)),
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${(ctx.parsed.y ?? 0).toLocaleString()} kg volume`,
        },
        backgroundColor: "#1E293B",
        padding: 10,
        cornerRadius: 8,
        titleFont: { family: "Inter" },
        bodyFont: { family: "JetBrains Mono", size: 12 },
      },
    },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: { display: false },
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <p className="font-display font-semibold">Weekly volume</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeDays} session{activeDays === 1 ? "" : "s"} logged this week
          </p>
        </div>
        <p className="font-mono text-sm font-semibold text-primary">
          {totalVolume.toLocaleString()} kg
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-44">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

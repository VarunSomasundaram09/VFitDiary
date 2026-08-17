import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Plus, Loader2, Scale } from "lucide-react";
import { isAxiosError } from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { progressService } from "@/services/progressService";
import { useToast } from "@/hooks/useToast";
import type { ApiErrorResponse } from "@/types/auth";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function WeightChart() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [weightInput, setWeightInput] = useState("");

  const { data: history, isLoading } = useQuery({
    queryKey: ["weight-history"],
    queryFn: progressService.getWeightHistory,
  });

  const mutation = useMutation({
    mutationFn: progressService.logWeight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weight-history"] });
      setWeightInput("");
      showToast({ variant: "success", title: "Weight logged" });
    },
    onError: (err) => {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Couldn't log your weight. Please try again."
        : "Couldn't log your weight. Please try again.";
      showToast({ variant: "error", title: "Something went wrong", description: message });
    },
  });

  const handleLog = () => {
    const value = Number(weightInput);
    if (!weightInput || Number.isNaN(value) || value <= 0) {
      showToast({ variant: "warning", title: "Enter a valid weight" });
      return;
    }
    mutation.mutate({ weightKg: value });
  };

  const chartData = {
    labels: (history ?? []).map((h) =>
      new Date(h.entryDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        data: (history ?? []).map((h) => h.weightKg),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.08)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: "#4F46E5",
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <p className="font-display font-semibold">Weight trend</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {history && history.length > 0
              ? `${history.length} entries logged`
              : "Log your first entry to start the trend"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.1"
            placeholder="kg today"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            className="h-9 w-24 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-surface-card px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          <Button size="sm" onClick={handleLog} disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />
        ) : !history || history.length === 0 ? (
          <EmptyState
            icon={Scale}
            title="No weight logged yet"
            description="Use the field above to log today's weight and start your trend line."
          />
        ) : (
          <div className="h-48">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { tooltip: { backgroundColor: "#1E293B", padding: 10, cornerRadius: 8 } },
                scales: {
                  x: { grid: { display: false } },
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

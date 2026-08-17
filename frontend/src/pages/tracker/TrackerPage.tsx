import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, Loader2, ClipboardList } from "lucide-react";
import { isAxiosError } from "axios";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExercisePicker } from "@/components/tracker/ExercisePicker";
import { PreviousSetBadge } from "@/components/tracker/PreviousSetBadge";
import { SetRow } from "@/components/tracker/SetRow";
import { WorkoutLogSummary } from "@/components/tracker/WorkoutLogSummary";

import { workoutLogService } from "@/services/workoutLogService";
import { useToast } from "@/hooks/useToast";
import type { ApiErrorResponse } from "@/types/auth";
import type { SetInput, WorkoutLogResult } from "@/types/tracker";

function createEmptySet(setNumber: number): SetInput {
  return { localId: crypto.randomUUID(), setNumber, weightKg: "", reps: "" };
}

export default function TrackerPage() {
  const { showToast } = useToast();
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [sets, setSets] = useState<SetInput[]>([createEmptySet(1)]);
  const [savedLog, setSavedLog] = useState<WorkoutLogResult | null>(null);

  const mutation = useMutation({
    mutationFn: workoutLogService.create,
    onSuccess: (log) => {
      setSavedLog(log);
      setSets([createEmptySet(1)]);
      showToast({ variant: "success", title: "Workout logged" });
    },
    onError: (err) => {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Couldn't save your workout. Please try again."
        : "Couldn't save your workout. Please try again.";
      showToast({ variant: "error", title: "Something went wrong", description: message });
    },
  });

  const handleExerciseChange = (id: number) => {
    setExerciseId(id);
    setSavedLog(null);
  };

  const updateSet = (localId: string, field: "weightKg" | "reps", value: string) => {
    setSets((prev) => prev.map((s) => (s.localId === localId ? { ...s, [field]: value } : s)));
  };

  const addSet = () => {
    setSets((prev) => [...prev, createEmptySet(prev.length + 1)]);
  };

  const removeSet = (localId: string) => {
    setSets((prev) =>
      prev
        .filter((s) => s.localId !== localId)
        .map((s, i) => ({ ...s, setNumber: i + 1 }))
    );
  };

  const handleSave = () => {
    if (!exerciseId) {
      showToast({ variant: "warning", title: "Choose an exercise first" });
      return;
    }
    const validSets = sets.filter((s) => s.weightKg !== "" && s.reps !== "");
    if (validSets.length === 0) {
      showToast({ variant: "warning", title: "Enter at least one complete set" });
      return;
    }

    mutation.mutate({
      logDate: new Date().toISOString().split("T")[0],
      sets: validSets.map((s) => ({
        exerciseId,
        setNumber: s.setNumber,
        weightKg: Number(s.weightKg),
        reps: Number(s.reps),
      })),
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Workout Tracker</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Log your sets — your streak, volume, and PRs update automatically.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <ExercisePicker value={exerciseId} onChange={handleExerciseChange} />
          <PreviousSetBadge exerciseId={exerciseId} />

          <div className="space-y-3 pt-1">
            <AnimatePresence initial={false}>
              {sets.map((set) => (
                <motion.div
                  key={set.localId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SetRow
                    set={set}
                    onChange={updateSet}
                    onRemove={removeSet}
                    canRemove={sets.length > 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={addSet}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Plus className="h-4 w-4" /> Add set
          </button>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save workout
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {savedLog ? (
        <WorkoutLogSummary log={savedLog} />
      ) : (
        <div className="flex items-center gap-2.5 text-xs text-slate-400 justify-center py-4">
          <ClipboardList className="h-3.5 w-3.5" />
          Your saved session will appear here
        </div>
      )}
    </div>
  );
}

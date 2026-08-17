import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Loader2, Sparkles } from "lucide-react";
import { isAxiosError } from "axios";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { SplitTypeSelector } from "@/components/workouts/SplitTypeSelector";
import { ExperienceLevelSelector } from "@/components/workouts/ExperienceLevelSelector";
import { DaysPerWeekStepper } from "@/components/workouts/DaysPerWeekStepper";
import { WorkoutPlanDisplay } from "@/components/workouts/WorkoutPlanDisplay";

import { workoutPlanService } from "@/services/workoutPlanService";
import { useToast } from "@/hooks/useToast";
import type { ApiErrorResponse } from "@/types/auth";
import type { ExperienceLevel, SplitType } from "@/types/workout";

export default function WorkoutGeneratorPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [showGenerator, setShowGenerator] = useState(false);

  const [splitType, setSplitType] = useState<SplitType>();
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>();
  const [daysPerWeek, setDaysPerWeek] = useState(3);

  const {
    data: activePlan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workout-plan-active"],
    queryFn: workoutPlanService.getActive,
    retry: false,
    throwOnError: false,
  });

  const mutation = useMutation({
    mutationFn: workoutPlanService.generate,
    onSuccess: (plan) => {
      queryClient.setQueryData(["workout-plan-active"], plan);
      setShowGenerator(false);
      showToast({
        variant: "success",
        title: "Plan generated",
        description: `${plan.name} is ready to go.`,
      });
    },
    onError: (err) => {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Couldn't generate a plan. Please try again."
        : "Couldn't generate a plan. Please try again.";
      showToast({ variant: "error", title: "Something went wrong", description: message });
    },
  });

  const handleGenerate = () => {
    if (!splitType || !experienceLevel) {
      showToast({ variant: "warning", title: "Choose a split and experience level first" });
      return;
    }
    mutation.mutate({ splitType, experienceLevel, daysPerWeek });
  };

  if (isLoading) return <DashboardSkeleton />;

  const hasPlan = !isError && !!activePlan;
  const showForm = showGenerator || !hasPlan;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Workout Generator</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            A structured split, built around your experience and schedule.
          </p>
        </div>
        {hasPlan && !showGenerator && (
          <Button variant="outline" size="sm" onClick={() => setShowGenerator(true)}>
            <Sparkles className="h-4 w-4" /> Generate new plan
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="generator-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2.5">
                    Choose a split
                  </p>
                  <SplitTypeSelector value={splitType} onChange={setSplitType} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2.5">
                    Your experience level
                  </p>
                  <ExperienceLevelSelector value={experienceLevel} onChange={setExperienceLevel} />
                </div>

                <DaysPerWeekStepper value={daysPerWeek} onChange={setDaysPerWeek} />

                <div className="flex items-center justify-end gap-3 pt-2">
                  {hasPlan && (
                    <Button variant="ghost" onClick={() => setShowGenerator(false)}>
                      Cancel
                    </Button>
                  )}
                  <Button onClick={handleGenerate} disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Dumbbell className="h-4 w-4" /> Generate plan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="plan-display"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activePlan && <WorkoutPlanDisplay plan={activePlan} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

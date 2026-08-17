import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, RotateCcw } from "lucide-react";
import { isAxiosError } from "axios";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { StepIndicator } from "@/components/assessment/StepIndicator";
import { BodyFatSelector } from "@/components/assessment/BodyFatSelector";
import { FitnessGoalSelector } from "@/components/assessment/FitnessGoalSelector";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

import { assessmentService } from "@/services/assessmentService";
import { useToast } from "@/hooks/useToast";
import { assessmentBasicsSchema, type AssessmentBasicsValues } from "@/utils/validation";
import { ACTIVITY_LEVEL_OPTIONS } from "@/types/assessment";
import type { ApiErrorResponse } from "@/types/auth";
import type { AssessmentResult } from "@/types/assessment";

const STEPS = ["Basics", "Body fat", "Results"];

export default function AssessmentPage() {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ["assessment-latest"],
    queryFn: assessmentService.getLatest,
    retry: false,
    // No assessment yet is an expected 404 for new users, not a page-level error.
    throwOnError: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AssessmentBasicsValues>({
    resolver: zodResolver(assessmentBasicsSchema),
    defaultValues: existing
      ? {
          age: existing.age,
          gender: existing.gender,
          heightCm: existing.heightCm,
          weightKg: existing.weightKg,
          goalWeightKg: existing.goalWeightKg ?? undefined,
          activityLevel: existing.activityLevel,
          fitnessGoal: existing.fitnessGoal ?? "MAINTAIN",
        }
      : { fitnessGoal: "MAINTAIN" },
  });

  const gender = watch("gender");
  const fitnessGoal = watch("fitnessGoal");

  const mutation = useMutation({
    mutationFn: assessmentService.submit,
    onSuccess: () => {
      setStep(3);
      showToast({
        variant: "success",
        title: "Assessment saved",
        description: "Your dashboard is now up to date.",
      });
    },
    onError: (err) => {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Couldn't save your assessment. Please try again."
        : "Couldn't save your assessment. Please try again.";
      showToast({ variant: "error", title: "Something went wrong", description: message });
    },
  });

  // Step 1 -> Step 2: just validate the basics form, nothing to submit yet.
  const goToBodyFatStep = handleSubmit(() => setStep(2));

  // Step 2 -> submit: basics + body fat percentage together.
  const submitAssessment = handleSubmit((values) => {
    if (!bodyFatPercentage) {
      showToast({ variant: "warning", title: "Pick a body fat range to continue" });
      return;
    }
    mutation.mutate({
      age: values.age,
      gender: values.gender,
      heightCm: values.heightCm,
      weightKg: values.weightKg,
      goalWeightKg: values.goalWeightKg,
      activityLevel: values.activityLevel,
      fitnessGoal: values.fitnessGoal,
      bodyFatPercentage,
    });
  });

  if (loadingExisting) return <DashboardSkeleton />;

  const displayedResult: AssessmentResult | undefined = mutation.data ?? (step === 3 ? existing : undefined);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold">Body Assessment</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Two minutes now gets you accurate calorie targets and a plan that fits.
        </p>
      </div>

      <StepIndicator steps={STEPS} currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <CardContent className="p-6 space-y-5">
                <form onSubmit={goToBodyFatStep} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Age"
                      type="number"
                      placeholder="28"
                      error={errors.age?.message}
                      {...register("age")}
                    />
                    <Select label="Gender" error={errors.gender?.message} {...register("gender")}>
                      <option value="">Select...</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Height (cm)"
                      type="number"
                      step="0.1"
                      placeholder="175"
                      error={errors.heightCm?.message}
                      {...register("heightCm")}
                    />
                    <Input
                      label="Weight (kg)"
                      type="number"
                      step="0.1"
                      placeholder="78"
                      error={errors.weightKg?.message}
                      {...register("weightKg")}
                    />
                  </div>

                  <Input
                    label="Goal weight (kg) — optional"
                    type="number"
                    step="0.1"
                    placeholder="72"
                    error={errors.goalWeightKg?.message}
                    {...register("goalWeightKg")}
                  />

                  <Select
                    label="Activity level"
                    error={errors.activityLevel?.message}
                    {...register("activityLevel")}
                  >
                    <option value="">Select...</option>
                    {ACTIVITY_LEVEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} — {opt.description}
                      </option>
                    ))}
                  </Select>

                  <FitnessGoalSelector
                    value={fitnessGoal}
                    onChange={(v) => setValue("fitnessGoal", v, { shouldValidate: true })}
                    error={errors.fitnessGoal?.message}
                  />

                  <div className="flex justify-end pt-2">
                    <Button type="submit">
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <CardContent className="p-6 space-y-6">
                <BodyFatSelector
                  gender={gender ?? "MALE"}
                  value={bodyFatPercentage}
                  onChange={setBodyFatPercentage}
                />
                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={submitAssessment} disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Calculating...
                      </>
                    ) : (
                      "See my results"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && displayedResult && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AssessmentResults result={displayedResult} />
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setBodyFatPercentage(null);
                }}
              >
                <RotateCcw className="h-4 w-4" /> Reassess
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

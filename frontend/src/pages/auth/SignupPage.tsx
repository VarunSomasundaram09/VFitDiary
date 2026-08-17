import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, User as UserIcon, Loader2 } from "lucide-react";
import { AuthLayout } from "@/pages/auth/AuthLayout";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { PasswordStrengthMeter } from "@/components/forms/PasswordStrengthMeter";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { signupSchema, type SignupFormValues } from "@/utils/validation";
import type { ApiErrorResponse } from "@/types/auth";
import { isAxiosError } from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { agreeToTerms: false as unknown as true },
  });

  const password = watch("password") ?? "";

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      await signup({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      showToast({
        variant: "success",
        title: "Account created",
        description: "Welcome to vfitdiary — let's set up your profile.",
      });
      navigate("/dashboard");
    } catch (err) {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Something went wrong. Please try again."
        : "Something went wrong. Please try again.";
      showToast({ variant: "error", title: "Couldn't create account", description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking in under two minutes."
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <Input
          label="Full name"
          placeholder="Jordan Rivera"
          icon={<UserIcon className="h-4 w-4" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <PasswordInput
          label="Confirm password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div>
          <label className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/40"
              {...register("agreeToTerms")}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1.5 text-xs text-danger">{errors.agreeToTerms.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

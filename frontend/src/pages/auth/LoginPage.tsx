import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import { AuthLayout } from "@/pages/auth/AuthLayout";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { loginSchema, type LoginFormValues } from "@/utils/validation";
import type { ApiErrorResponse } from "@/types/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values);
      showToast({ variant: "success", title: "Welcome back" });
      navigate("/dashboard");
    } catch (err) {
      const message = isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.message ?? "Invalid email or password"
        : "Invalid email or password";
      showToast({ variant: "error", title: "Couldn't log in", description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to keep your streak going.">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/40"
              {...register("rememberMe")}
            />
            Remember me
          </label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}

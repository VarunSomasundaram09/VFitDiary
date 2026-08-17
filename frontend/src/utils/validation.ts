import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name is too long"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/** Simple heuristic password-strength score from 0 (weak) to 4 (strong). */
export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export const assessmentBasicsSchema = z.object({
  age: z.coerce.number().int().min(13, "Must be at least 13").max(100, "Enter a realistic age"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { errorMap: () => ({ message: "Select a gender" }) }),
  heightCm: z.coerce.number().min(100, "Enter a realistic height").max(250, "Enter a realistic height"),
  weightKg: z.coerce.number().min(30, "Enter a realistic weight").max(300, "Enter a realistic weight"),
  goalWeightKg: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z.number().min(30, "Enter a realistic weight").max(300, "Enter a realistic weight").optional()
  ),
  activityLevel: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE"], {
    errorMap: () => ({ message: "Select your activity level" }),
  }),
  fitnessGoal: z.enum(["CUT", "MAINTAIN", "BULK"], {
    errorMap: () => ({ message: "Select your goal" }),
  }),
});

export type AssessmentBasicsValues = z.infer<typeof assessmentBasicsSchema>;


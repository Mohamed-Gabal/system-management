import { z } from "zod";

const passwordUppercase = /[A-Z]/;
const passwordLowercase = /[a-z]/;
const passwordDigit = /[0-9]/;
const passwordSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']/;
const passwordNoWhitespace = /^\S+$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(passwordNoWhitespace, "Password must not contain spaces")
      .regex(passwordUppercase, "Must contain at least one uppercase letter")
      .regex(passwordLowercase, "Must contain at least one lowercase letter")
      .regex(passwordDigit, "Must contain at least one digit")
      .regex(
        passwordSpecialChar,
        "Must contain at least one special character",
      ),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

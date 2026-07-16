import { z } from "zod";

const nameRegex = /^\p{L}+(?: \p{L}+)*$/u;

const passwordUppercase = /[A-Z]/;
const passwordLowercase = /[a-z]/;
const passwordDigit = /[0-9]/;
const passwordSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']/;
const passwordNoWhitespace = /^\S+$/;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(
        nameRegex,
        "Name must contain letters only (single spaces allowed between parts)",
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),

    jobTitle: z.string().trim().optional(),

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

export type SignUpFormValues = z.infer<typeof signUpSchema>;

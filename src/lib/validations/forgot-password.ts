import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address (e.g. user@company.com)"),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

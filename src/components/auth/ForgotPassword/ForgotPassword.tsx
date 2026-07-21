"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import checkIcon from "@/assets/icons/check.svg";
import timeIcon from "@/assets/icons/time.svg";
import { requestPasswordReset } from "@/services/auth";

import {
  ForgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/forgot-password";
import { useResendTimer } from "./useResendTimer";
import Image from "next/image";

// Generic message shown on every "successful" call, and on most error
const SUCCESS_MESSAGE =
  "If an account exists with this email, we've sent a password reset link.";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    secondsLeft,
    trialsUsed,
    trialsExhausted,
    isCoolingDown,
    registerTrial,
    formattedTime,
  } = useResendTimer();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const submitReset = async (email: string) => {
    setIsLoading(true);
    setApiError(null);

    const result = await requestPasswordReset(email);

    setIsLoading(false);

    if (result.ok) {
      registerTrial();
      setApiError(null);
      setHasSucceeded(true);
    } else {
      setHasSucceeded(false);
      setApiError(result.message);
    }
  };

  const onSubmit = handleSubmit((data) => submitReset(data.email));

  const handleResend = () => {
    const email = getValues("email");
    if (!email || isCoolingDown || trialsExhausted || isLoading) return;
    submitReset(email);
  };

  const resendLabel = trialsExhausted
    ? "Maximum attempts reached"
    : isCoolingDown
      ? `Resend in ${formattedTime}`
      : "Resend";

  return (
    <section className="w-full max-w-[448px] mx-auto">
      {/* Title and subtitle */}
      <header className="mb-8">
        <h1 className="text-headline-lg tracking-headline-lg font-bold text-neutral-dark text-left">
          Forgot password?
        </h1>
        <p className="text-body-md text-neutral mt-2 text-left">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </header>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        {/* Email field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-label-sm tracking-label-sm font-medium uppercase text-neutral"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-md border border-neutral-light bg-surface-low px-4 py-2.5 text-body-md text-neutral-dark placeholder:text-neutral-light outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-container/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-label-sm text-error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Non-field API error (network, rate limit, server) */}
        {apiError && (
          <p role="alert" className="text-body-md text-error">
            {apiError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-body-md font-semibold text-white transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Back to login */}
        <div className="flex justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-body-md font-medium text-primary transition-colors hover:text-primary-container hover:underline"
          >
            <Image src={arrowLeft} alt="Arrow-Left" width={10} height={10} />
            Back to log in
          </Link>
        </div>

        {hasSucceeded && (
          <>
            <hr className="border-t border-neutral-light" />

            {/* Success message — identical wording every time, by design */}
            <div className="flex items-start gap-2 rounded-md bg-success/15 p-3">
              <Image src={checkIcon} alt="Check-Icon" width={10} height={10} />
              <p className="text-body-md text-neutral-dark">
                {SUCCESS_MESSAGE}
              </p>
            </div>

            {/* Resend */}
            <div className="space-y-2 text-center">
              <p className="text-label-sm tracking-label-sm font-medium uppercase text-neutral">
                Didn&apos;t receive the email?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={isCoolingDown || trialsExhausted || isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-surface-low py-2.5 text-body-md font-medium text-neutral-dark transition-colors hover:bg-surface-highest disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-surface-low"
              >
                {isCoolingDown && (
                  <Image
                    src={timeIcon}
                    alt="Time-Icon"
                    width={10}
                    height={10}
                  />
                )}
                {resendLabel}
              </button>
              {trialsUsed > 0 && !trialsExhausted && (
                <p className="text-label-sm text-neutral-light">
                  {3 - trialsUsed} resend{3 - trialsUsed === 1 ? "" : "s"} left
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </section>
  );
}

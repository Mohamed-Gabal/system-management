import { useCallback, useEffect, useRef, useState } from "react";

const COOLDOWN_SECONDS = 5 * 60; // 5 minutes
const MAX_TRIALS = 3;

interface UseResendTimerReturn {
  /** Seconds left before "Resend" becomes clickable again */
  secondsLeft: number;
  /** How many times the user has sent the email (initial send counts as trial 1) */
  trialsUsed: number;
  /** True once the user has used all 3 allowed trials */
  trialsExhausted: boolean;
  /** True while the cooldown is still running */
  isCoolingDown: boolean;
  /** Call this every time an email is (re)sent to start/restart the cooldown and count the trial */
  registerTrial: () => void;
  /** Formatted mm:ss label, e.g. "05:00" */
  formattedTime: string;
}
export function useResendTimer(): UseResendTimerReturn {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [trialsUsed, setTrialsUsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const registerTrial = useCallback(() => {
    setTrialsUsed((prev) => Math.min(prev + 1, MAX_TRIALS));
    setSecondsLeft(COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      clearTimer();
      return;
    }

    clearTimer();
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  useEffect(() => clearTimer, [clearTimer]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return {
    secondsLeft,
    trialsUsed,
    trialsExhausted: trialsUsed >= MAX_TRIALS,
    isCoolingDown: secondsLeft > 0,
    registerTrial,
    formattedTime: `${minutes}:${seconds}`,
  };
}

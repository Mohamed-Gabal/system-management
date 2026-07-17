"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = "", ...rest }, ref) => {
    // Local state to toggle password visibility (show/hide)
    const [visible, setVisible] = useState(false);

    return (
      <div>
        <label
          htmlFor={rest.id}
          className="mb-1.5 block text-label-sm font-semibold uppercase tracking-label-sm text-neutral"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            {...rest}
            id={rest.id}
            type={visible ? "text" : "password"}
            className={`h-12 w-full rounded-lg bg-surface-highest px-3.5 pr-11 text-body-md text-neutral-dark placeholder:text-neutral outline-none transition ${error ? "ring-2 ring-error" : "focus:ring-2 focus:ring-primary-container"} ${className}`}
          />

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center cursor-pointer"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
          >
            <Image
              src={visible ? eyeOffIcon : eyeIcon}
              alt=""
              width={18}
              height={18}
            />
          </button>
        </div>

        {error && <p className="text-label-sm text-error mt-1">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;

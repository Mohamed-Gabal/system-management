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
          className="block text-label-sm font-bold text-neutral tracking-label-sm mb-1.5"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={rest.id}
            type={visible ? "text" : "password"}
            className={`w-full rounded-lg bg-surface-highest px-3.5 py-2.5 pr-10 text-body-md text-neutral-dark placeholder:text-neutral outline-none focus:ring-2 focus:ring-primary-container ${className}`}
            {...rest}
          />

          {/* Toggle button, switches between the two icons from Figma */}
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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

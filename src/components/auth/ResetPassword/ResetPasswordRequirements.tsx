import Image from "next/image";
import checkIcon from "@/assets/icons/check.svg";

interface ResetPasswordRequirementsProps {
  password: string;
}

const ResetPasswordRequirements = ({
  password,
}: ResetPasswordRequirementsProps) => {
  // Mirrors the rules enforced in lib/validations/reset-password.ts
  const hasLength = password.length >= 8 && password.length <= 64;
  const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']/.test(password);

  const requirements = [
    { label: "8-64 characters", met: hasLength },
    { label: "Uppercase & Lowercase", met: hasUpperLower },
    { label: "At least one digit", met: hasDigit },
    { label: "Special character (e.g. !@#$)", met: hasSpecialChar },
  ];

  return (
    <div className="rounded-lg bg-surface-low p-4">
      <p className="text-label-sm font-semibold uppercase tracking-label-sm text-neutral mb-3">
        Security requirements
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {requirements.map((req) => (
          <div key={req.label} className="flex items-center gap-2">
            {req.met ? (
              <Image src={checkIcon} alt="" width={14} height={14} />
            ) : (
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-neutral-light" />
            )}
            <span
              className={`text-label-sm ${
                req.met ? "text-neutral-dark" : "text-neutral-light"
              }`}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResetPasswordRequirements;

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  // Each check reflects one condition already enforced by the Zod schema.
  // This component only reflects live feedback while typing.
  const hasMinLength = password.length >= 8;
  const hasUpperLowerDigit =
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const requirements = [
    { label: "At least 8 characters", met: hasMinLength },
    { label: "One uppercase, lowercase, and digit", met: hasUpperLowerDigit },
    { label: "One special character", met: hasSpecialChar },
  ];

  return (
    <div className="rounded-lg bg-surface-low p-4 flex flex-col gap-2">
      {requirements.map((req) => (
        <div key={req.label} className="flex items-center gap-2">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
              req.met
                ? "bg-success border-success"
                : "border-neutral-light bg-transparent"
            }`}
          />
          <span className="text-label-sm text-neutral">{req.label}</span>
        </div>
      ))}
    </div>
  );
};
export default PasswordRequirements;

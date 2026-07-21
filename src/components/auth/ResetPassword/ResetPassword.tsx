// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import PasswordInput from "@/components/ui/PasswordInput";
// import Button from "@/components/ui/Button";
// import ResetPasswordRequirements from "@/components/auth/ResetPassword/ResetPasswordRequirements";
// import checkIcon from "@/assets/icons/check.svg";

// import {
//   resetPasswordSchema,
//   type ResetPasswordFormValues,
// } from "@/lib/validations/reset-password";
// import { resetPassword } from "@/services/auth";

// const SUCCESS_MESSAGE =
//   "Your password has been updated successfully. You can now log in";

// const ResetPassword = () => {
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSucceeded, setHasSucceeded] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);

//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   useEffect(() => {
//     const hash = window.location.hash;

//     const params = new URLSearchParams(hash.substring(1));

//     const token = params.get("access_token");
//     const type = params.get("type");

//     if (type === "recovery" && token) {
//       setAccessToken(token);
//     }
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<ResetPasswordFormValues>({
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: { password: "", confirmPassword: "" },
//   });

//   const passwordValue = watch("password", "");

//   useEffect(() => {
//     if (!hasSucceeded) return;
//     const timer = setTimeout(() => {
//       router.push("/login");
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [hasSucceeded, router]);

//   const onSubmit = async (data: ResetPasswordFormValues) => {
//     if (!accessToken) return;

//     setIsLoading(true);
//     setApiError(null);

//     try {
//       const result = await resetPassword(accessToken, data.password);

//       if (result.ok) {
//         setHasSucceeded(true);
//       } else {
//         setApiError(result.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isValidLink) {
//     return (
//       <section className="w-full max-w-[448px] mx-auto text-center">
//         <h1 className="text-headline-lg tracking-headline-lg font-bold text-neutral-dark">
//           Invalid or expired reset link.
//         </h1>
//         <p className="text-body-md text-neutral mt-2">
//           Please request a new password reset link.
//         </p>
//         <Link
//           href="/forgot-password"
//           className="mt-6 inline-block text-body-md font-medium text-primary hover:text-primary-container hover:underline"
//         >
//           Back to forgot password
//         </Link>
//       </section>
//     );
//   }

//   if (hasSucceeded) {
//     return (
//       <section className="w-full max-w-[448px] mx-auto">
//         <div className="flex items-start gap-2 rounded-md bg-success/15 p-3">
//           <Image src={checkIcon} alt="" width={14} height={14} />
//           <p className="text-body-md text-neutral-dark">{SUCCESS_MESSAGE}</p>
//         </div>
//         <p className="text-label-sm text-neutral-light text-center mt-4">
//           Redirecting to log in...
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full max-w-[448px] mx-auto">
//       <header className="mb-8">
//         <h1 className="text-headline-lg tracking-headline-lg font-bold text-neutral-dark text-left">
//           Create a New Password
//         </h1>
//         <p className="text-body-md text-neutral mt-2 text-left">
//           Create a new, strong password to secure your workstation access.
//         </p>
//       </header>

//       <form
//         className="flex flex-col gap-4"
//         onSubmit={handleSubmit(onSubmit)}
//         noValidate
//       >
//         <PasswordInput
//           id="password"
//           label="NEW PASSWORD"
//           placeholder="Enter new password"
//           disabled={isLoading}
//           error={errors.password?.message}
//           {...register("password")}
//         />

//         <PasswordInput
//           id="confirmPassword"
//           label="CONFIRM PASSWORD"
//           placeholder="Repeat new password"
//           disabled={isLoading}
//           error={errors.confirmPassword?.message}
//           {...register("confirmPassword")}
//         />

//         <ResetPasswordRequirements password={passwordValue} />

//         {apiError && (
//           <p role="alert" className="text-body-md text-error">
//             {apiError}
//           </p>
//         )}

//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? "Updating..." : "Update Password"}
//         </Button>

//         <div className="flex justify-center">
//           <Link
//             href="/login"
//             className="text-body-md font-medium text-primary hover:text-primary-container hover:underline"
//           >
//             Back to Log In
//           </Link>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default ResetPassword;

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import ResetPasswordRequirements from "@/components/auth/ResetPassword/ResetPasswordRequirements";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/reset-password";

import { resetPassword } from "@/services/auth";

const SUCCESS_MESSAGE =
  "Your password has been updated successfully. You can now log in";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const isValidLink = !!accessToken;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    if (!hasSucceeded) return;

    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasSucceeded, router]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!accessToken) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const result = await resetPassword(accessToken, data.password);

      if (result.ok) {
        setApiError(null);
        setHasSucceeded(true);
      } else {
        setHasSucceeded(false);
        setApiError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidLink) {
    return (
      <section>
        <h1>Invalid or expired reset link.</h1>

        <p>Please request a new password reset link.</p>

        <Link href="/forgot-password">Back to forgot password</Link>
      </section>
    );
  }

  if (hasSucceeded) {
    return (
      <section>
        <p>{SUCCESS_MESSAGE}</p>

        <p>Redirecting to log in...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Create a New Password</h1>

      <p>Create a new, strong password to secure your workstation access.</p>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <PasswordInput
          id="password"
          label="NEW PASSWORD"
          placeholder="Enter new password"
          disabled={isLoading}
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="CONFIRM PASSWORD"
          placeholder="Repeat new password"
          disabled={isLoading}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <ResetPasswordRequirements password={passwordValue} />

        {apiError && (
          <p role="alert" className="text-body-md text-error">
            {apiError}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </Button>

        <div className="flex justify-center">
          <Link
            href="/login"
            className="text-body-md font-medium text-primary hover:text-primary-container hover:underline"
          >
            Back to Log In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;

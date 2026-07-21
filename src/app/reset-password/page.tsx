import { Suspense } from "react";
import ResetPassword from "@/components/auth/ResetPassword/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-8">
      <div className="w-full max-w-[400px] rounded-lg bg-surface p-8 shadow-card md:p-10">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPassword />
        </Suspense>
      </div>
    </main>
  );
};

export default ResetPasswordPage;

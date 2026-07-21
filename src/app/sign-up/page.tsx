import SignUpForm from "@/components/auth/sign-up/SignUpForm";

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:py-12">
      {/* Card wrapper: no border/shadow on mobile, bordered card on desktop */}
      <div className="w-full max-w-md rounded-2xl bg-background p-0 sm:border sm:border-neutral-light/40 sm:p-8 sm:shadow-lg">
        <SignUpForm />
      </div>
    </main>
  );
};
export default SignUpPage;

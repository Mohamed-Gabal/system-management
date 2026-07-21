import LoginForm from "@/components/auth/login/LoginForm";

const Page = () => {
  return (
    <main className="min-h-screen bg-background px-6 pt-20 pb-12 md:flex md:items-center md:justify-center md:p-8">
      <div className="mx-auto w-full max-w-[480px] md:rounded-lg md:bg-surface md:px-10 md:py-8 md:shadow-card">
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;

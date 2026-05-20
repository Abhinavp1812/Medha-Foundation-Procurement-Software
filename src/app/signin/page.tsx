import Link from "next/link";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="h-8 w-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-display text-lg leading-none">M</span>
          </div>
          <span className="font-display text-xl font-medium tracking-tight">
            Medha <span className="text-[#e94e3c]">Procure</span>
          </span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-medium mb-1">Welcome back</h1>
          <p className="text-black/55 mb-8">Sign in to continue.</p>
          <SignInForm />
          <p className="mt-6 text-sm text-black/55">
            New vendor?{" "}
            <Link
              href="/signup"
              className="text-[#e94e3c] font-medium underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

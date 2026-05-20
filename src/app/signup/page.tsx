import Link from "next/link";
import { SignUpForm } from "@/components/SignUpForm";

export default function SignUpPage() {
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

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-medium mb-1">
            Become a vendor
          </h1>
          <p className="text-black/55 mb-8">
            Register to start submitting quotations.
          </p>
          <SignUpForm />
          <p className="mt-6 text-sm text-black/55">
            Already registered?{" "}
            <Link
              href="/signin"
              className="text-[#e94e3c] font-medium underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

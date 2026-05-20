"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    // Let the server decide the home by role; middleware will correct if needed.
    const callbackUrl = params.get("callbackUrl");
    router.push(callbackUrl || "/redirect");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-[#fdecea] text-[#c0392b] text-sm px-4 py-3">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-black/85 transition-colors disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

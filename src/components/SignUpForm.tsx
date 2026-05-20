"use client";

import { useActionState } from "react";
import { registerVendor } from "@/lib/actions";

const initialState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    registerVendor,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="rounded-lg bg-[#fdecea] text-[#c0392b] text-sm px-4 py-3">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1.5">Your name</label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="Asha Verma"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Company name</label>
        <input
          name="companyName"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="Verma Supplies Pvt Ltd"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Phone</label>
        <input
          name="phone"
          required
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Password</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors"
          placeholder="At least 8 characters"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#e94e3c] text-white py-2.5 font-medium hover:bg-[#d8412f] transition-colors disabled:opacity-50"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-black/55 hover:text-black transition-colors"
    >
      Sign out
    </button>
  );
}

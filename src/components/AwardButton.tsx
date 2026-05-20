"use client";

import { useState, useTransition } from "react";
import { awardQuote } from "@/lib/actions";

export function AwardButton({
  rfqId,
  quoteId,
}: {
  rfqId: string;
  quoteId: string;
}) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex gap-2 items-center">
        <button
          onClick={() =>
            startTransition(async () => {
              await awardQuote(rfqId, quoteId);
            })
          }
          disabled={pending}
          className="text-xs bg-[#1e7e34] text-white px-3 py-1.5 rounded-full font-medium disabled:opacity-50"
        >
          {pending ? "Awarding…" : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-black/50"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs border border-black/15 px-3 py-1.5 rounded-full font-medium hover:bg-black/5 transition-colors"
    >
      Award
    </button>
  );
}

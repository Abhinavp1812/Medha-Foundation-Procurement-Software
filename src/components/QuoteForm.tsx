"use client";

import { useActionState, useState } from "react";
import { submitQuote } from "@/lib/actions";

type Existing = {
  unitPrice: number;
  deliveryDays: number;
  notes: string;
  attachmentUrl: string;
} | null;

const initialState: { error?: string; success?: string } = {};

export function QuoteForm({
  rfqId,
  quantity,
  existing,
}: {
  rfqId: string;
  quantity: number;
  existing: Existing;
}) {
  const [state, formAction, pending] = useActionState(
    submitQuote,
    initialState
  );
  const [unitPrice, setUnitPrice] = useState(existing?.unitPrice ?? 0);

  const field =
    "w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors bg-white";

  const total = unitPrice * quantity;
  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="rfqId" value={rfqId} />

      {state?.error && (
        <div className="rounded-lg bg-[#fdecea] text-[#c0392b] text-sm px-4 py-3">
          {state.error}
        </div>
      )}
      {state?.ok && (
        <div className="rounded-lg bg-[#e6f4ea] text-[#1e7e34] text-sm px-4 py-3">
          Quotation saved. The Medha team can now review it.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Unit price (₹)
          </label>
          <input
            name="unitPrice"
            type="number"
            min={1}
            step="0.01"
            required
            defaultValue={existing?.unitPrice || ""}
            onChange={(e) => setUnitPrice(Number(e.target.value) || 0)}
            className={field}
            placeholder="28000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Delivery (days)
          </label>
          <input
            name="deliveryDays"
            type="number"
            min={1}
            required
            defaultValue={existing?.deliveryDays || ""}
            className={field}
            placeholder="14"
          />
        </div>
      </div>

      <div className="rounded-lg bg-black/[0.03] px-4 py-3 text-sm flex justify-between">
        <span className="text-black/55">
          Total for {quantity} units
        </span>
        <span className="font-medium">{inr(total)}</span>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Notes <span className="text-black/40">(optional)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={existing?.notes}
          className={field}
          placeholder="Specs, warranty, what's included…"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Attachment URL <span className="text-black/40">(optional)</span>
        </label>
        <input
          name="attachmentUrl"
          type="url"
          defaultValue={existing?.attachmentUrl}
          className={field}
          placeholder="https://link-to-your-proposal.pdf"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#e94e3c] text-white px-6 py-2.5 font-medium hover:bg-[#d8412f] transition-colors disabled:opacity-50"
      >
        {pending
          ? "Saving…"
          : existing
          ? "Update quotation"
          : "Submit quotation"}
      </button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { createRfq } from "@/lib/actions";

const initialState: { error?: string } = {};

export function NewRfqForm() {
  const [state, formAction, pending] = useActionState(createRfq, initialState);

  const field =
    "w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-black transition-colors bg-white";

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-lg bg-[#fdecea] text-[#c0392b] text-sm px-4 py-3">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1.5">Title</label>
        <input name="title" required className={field} placeholder="100 student laptops" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          className={field}
          placeholder="Specs, minimum requirements, delivery location, warranty expectations…"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Quantity</label>
          <input
            name="quantity"
            type="number"
            min={1}
            required
            className={field}
            placeholder="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Unit</label>
          <input name="unit" className={field} placeholder="laptops" defaultValue="units" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Category <span className="text-black/40">(optional)</span>
          </label>
          <input name="category" className={field} placeholder="Electronics" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Budget ₹ <span className="text-black/40">(optional)</span>
          </label>
          <input
            name="budget"
            type="number"
            min={0}
            step="0.01"
            className={field}
            placeholder="3000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Quotation deadline
        </label>
        <input name="deadline" type="date" required className={field} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#e94e3c] text-white px-6 py-2.5 font-medium hover:bg-[#d8412f] transition-colors disabled:opacity-50"
      >
        {pending ? "Posting…" : "Post requirement"}
      </button>
    </form>
  );
}

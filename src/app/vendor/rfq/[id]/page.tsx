import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { QuoteForm } from "@/components/QuoteForm";

export default async function VendorRfqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const vendorId = session!.user.id;

  const rfq = await prisma.rfq.findUnique({ where: { id } });
  if (!rfq) notFound();

  const existing = await prisma.quote.findUnique({
    where: { rfqId_vendorId: { rfqId: id, vendorId } },
  });

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="px-8 py-7 max-w-2xl">
      <Link
        href="/vendor"
        className="text-sm text-black/50 hover:text-black mb-4 inline-block"
      >
        ← Back to requirements
      </Link>

      <h1 className="font-display text-2xl font-medium">{rfq.title}</h1>
      <p className="text-black/55 mt-2 mb-4">{rfq.description}</p>

      <div className="flex flex-wrap gap-5 text-sm text-black/55 mb-7 pb-7 border-b border-black/10">
        <span>
          Quantity:{" "}
          <strong className="text-black">
            {rfq.quantity} {rfq.unit}
          </strong>
        </span>
        <span>
          Deadline:{" "}
          <strong className="text-black">
            {rfq.deadline.toLocaleDateString()}
          </strong>
        </span>
        {rfq.budget && (
          <span>
            Budget: <strong className="text-black">{inr(rfq.budget)}</strong>
          </span>
        )}
      </div>

      {rfq.status !== "OPEN" ? (
        <div className="rounded-lg bg-black/5 text-black/60 px-4 py-3 text-sm">
          This requirement is no longer accepting quotations.
        </div>
      ) : (
        <>
          <h2 className="font-medium mb-4">
            {existing ? "Update your quotation" : "Your quotation"}
          </h2>
          <QuoteForm
            rfqId={rfq.id}
            quantity={rfq.quantity}
            existing={
              existing
                ? {
                    unitPrice: existing.unitPrice,
                    deliveryDays: existing.deliveryDays,
                    notes: existing.notes ?? "",
                    attachmentUrl: existing.attachmentUrl ?? "",
                  }
                : null
            }
          />
        </>
      )}
    </div>
  );
}

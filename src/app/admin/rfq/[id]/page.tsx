import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AwardButton } from "@/components/AwardButton";

export default async function RfqComparePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rfq = await prisma.rfq.findUnique({
    where: { id },
    include: {
      quotes: {
        include: { vendor: true },
        orderBy: { unitPrice: "asc" },
      },
    },
  });

  if (!rfq) notFound();

  const lowest = rfq.quotes.length
    ? Math.min(...rfq.quotes.map((q) => q.unitPrice))
    : null;
  const fastest = rfq.quotes.length
    ? Math.min(...rfq.quotes.map((q) => q.deliveryDays))
    : null;

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="px-8 py-7 max-w-6xl">
      <Link
        href="/admin"
        className="text-sm text-black/50 hover:text-black mb-4 inline-block"
      >
        ← Back to dashboard
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-medium">{rfq.title}</h1>
          <p className="text-black/55 mt-1 max-w-2xl">{rfq.description}</p>
          <div className="flex gap-5 mt-3 text-sm text-black/55">
            <span>
              Qty: <strong className="text-black">{rfq.quantity} {rfq.unit}</strong>
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
        </div>
        <span
          className={`text-xs px-3 py-1.5 rounded-full font-medium ${
            rfq.status === "AWARDED"
              ? "bg-[#fdecea] text-[#c0392b]"
              : "bg-[#e6f4ea] text-[#1e7e34]"
          }`}
        >
          {rfq.status}
        </span>
      </div>

      <h2 className="font-medium mb-3">
        Quotations{" "}
        <span className="text-black/40 font-normal">({rfq.quotes.length})</span>
      </h2>

      {rfq.quotes.length === 0 ? (
        <div className="rounded-xl bg-white border border-black/8 px-5 py-12 text-center text-black/40">
          No quotations submitted yet.
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-black/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-black/45 border-b border-black/8 bg-black/[0.015]">
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium">Unit price</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Delivery</th>
                <th className="px-5 py-3 font-medium">Notes</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rfq.quotes.map((q) => (
                <tr
                  key={q.id}
                  className={`border-b border-black/5 last:border-0 ${
                    q.status === "AWARDED" ? "bg-[#e6f4ea]/40" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="font-medium">
                      {q.vendor.companyName ?? q.vendor.name}
                    </div>
                    <div className="text-black/45 text-xs">{q.vendor.name}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium">{inr(q.unitPrice)}</span>
                    {q.unitPrice === lowest && (
                      <span className="ml-2 text-xs bg-[#e6f4ea] text-[#1e7e34] px-2 py-0.5 rounded-full">
                        lowest
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-black/70">{inr(q.totalPrice)}</td>
                  <td className="px-5 py-4">
                    <span className="text-black/70">{q.deliveryDays} days</span>
                    {q.deliveryDays === fastest && (
                      <span className="ml-2 text-xs bg-[#eaf2fb] text-[#1d63b3] px-2 py-0.5 rounded-full">
                        fastest
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-black/55 max-w-[200px]">
                    {q.notes ? (
                      <span className="line-clamp-2">{q.notes}</span>
                    ) : (
                      <span className="text-black/30">—</span>
                    )}
                    {q.attachmentUrl && (
                      <a
                        href={q.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[#e94e3c] text-xs mt-1 hover:underline"
                      >
                        View attachment ↗
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-black/55">{q.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {rfq.status !== "AWARDED" && (
                      <AwardButton rfqId={rfq.id} quoteId={q.id} />
                    )}
                    {q.status === "AWARDED" && (
                      <span className="text-[#1e7e34] text-xs font-medium">
                        ✓ Awarded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

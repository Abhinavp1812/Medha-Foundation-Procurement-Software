import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MyQuotesPage() {
  const session = await auth();
  const vendorId = session!.user.id;

  const quotes = await prisma.quote.findMany({
    where: { vendorId },
    orderBy: { createdAt: "desc" },
    include: { rfq: true },
  });

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const statusStyle: Record<string, string> = {
    SUBMITTED: "bg-[#eaf2fb] text-[#1d63b3]",
    SHORTLISTED: "bg-[#fff4e0] text-[#b8860b]",
    AWARDED: "bg-[#e6f4ea] text-[#1e7e34]",
    REJECTED: "bg-black/5 text-black/45",
  };

  return (
    <div className="px-8 py-7 max-w-4xl">
      <h1 className="font-display text-2xl font-medium mb-1">My quotations</h1>
      <p className="text-black/50 text-sm mb-7">
        Every bid you&apos;ve submitted and its current status.
      </p>

      {quotes.length === 0 ? (
        <div className="rounded-xl bg-white border border-black/8 px-5 py-12 text-center text-black/40">
          You haven&apos;t submitted any quotations yet.{" "}
          <Link href="/vendor" className="text-[#e94e3c] underline">
            Browse open requirements
          </Link>
          .
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-black/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-black/45 border-b border-black/8">
                <th className="px-5 py-3 font-medium">Requirement</th>
                <th className="px-5 py-3 font-medium">Unit price</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Delivery</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-black/5 last:border-0"
                >
                  <td className="px-5 py-3.5 font-medium">{q.rfq.title}</td>
                  <td className="px-5 py-3.5 text-black/70">
                    {inr(q.unitPrice)}
                  </td>
                  <td className="px-5 py-3.5 text-black/70">
                    {inr(q.totalPrice)}
                  </td>
                  <td className="px-5 py-3.5 text-black/70">
                    {q.deliveryDays} days
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[q.status]}`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {q.rfq.status === "OPEN" && (
                      <Link
                        href={`/vendor/rfq/${q.rfqId}`}
                        className="text-[#e94e3c] font-medium hover:underline"
                      >
                        Edit →
                      </Link>
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

import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function VendorDashboard() {
  const session = await auth();
  const vendorId = session!.user.id;

  const rfqs = await prisma.rfq.findMany({
    where: { status: "OPEN" },
    orderBy: { deadline: "asc" },
    include: {
      quotes: { where: { vendorId }, select: { id: true } },
    },
  });

  return (
    <div className="px-8 py-7 max-w-5xl">
      <h1 className="font-display text-2xl font-medium mb-1">
        Open requirements
      </h1>
      <p className="text-black/50 text-sm mb-7">
        Submit your best quotation before each deadline.
      </p>

      {rfqs.length === 0 ? (
        <div className="rounded-xl bg-white border border-black/8 px-5 py-12 text-center text-black/40">
          No open requirements right now. Check back soon.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {rfqs.map((rfq) => {
            const alreadyQuoted = rfq.quotes.length > 0;
            return (
              <div
                key={rfq.id}
                className="rounded-xl bg-white border border-black/8 p-5 hover:border-black/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-medium text-lg">{rfq.title}</h2>
                  {alreadyQuoted && (
                    <span className="text-xs bg-[#e6f4ea] text-[#1e7e34] px-2.5 py-1 rounded-full font-medium shrink-0">
                      Quoted
                    </span>
                  )}
                </div>
                <p className="text-black/55 text-sm line-clamp-2 mb-4">
                  {rfq.description}
                </p>
                <div className="flex gap-4 text-sm text-black/55 mb-4">
                  <span>
                    {rfq.quantity} {rfq.unit}
                  </span>
                  <span>·</span>
                  <span>Due {rfq.deadline.toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/vendor/rfq/${rfq.id}`}
                  className="inline-block text-sm font-medium text-[#e94e3c] hover:underline"
                >
                  {alreadyQuoted ? "Update quotation →" : "Submit quotation →"}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

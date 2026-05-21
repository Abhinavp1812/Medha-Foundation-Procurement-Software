// ─── Mock Invoice Data ────────────────────────────────────────────────────────
const INVOICES = [
  {
    invoiceNo: "INV-DL-4521",
    vendor: "Dell India Pvt. Ltd.",
    poNumber: "PO-2526-034",
    invoiceAmount: 68000,
    poAmount: 68000,
    receiptConfirmed: true,
    matchStatus: "Matched",
    invoiceDate: "20 May 2026",
    dueDate: "19 Jun 2026",
  },
  {
    invoiceNo: "INV-FL-2290",
    vendor: "Featherlite Furniture",
    poNumber: "PO-2526-033",
    invoiceAmount: 32000,
    poAmount: 32000,
    receiptConfirmed: true,
    matchStatus: "Matched",
    invoiceDate: "16 May 2026",
    dueDate: "15 Jun 2026",
  },
  {
    invoiceNo: "INV-EP-7734",
    vendor: "Epson India Pvt. Ltd.",
    poNumber: "PO-2526-032",
    invoiceAmount: 29200,
    poAmount: 28500,
    receiptConfirmed: false,
    matchStatus: "Discrepancy",
    invoiceDate: "14 May 2026",
    dueDate: "13 Jun 2026",
  },
  {
    invoiceNo: "INV-HP-1102",
    vendor: "HPCL Retail",
    poNumber: "PO-2526-031",
    invoiceAmount: 4800,
    poAmount: 4800,
    receiptConfirmed: true,
    matchStatus: "Matched",
    invoiceDate: "08 May 2026",
    dueDate: "07 Jun 2026",
  },
  {
    invoiceNo: "INV-NP-8833",
    vendor: "Navneet Publications Ltd.",
    poNumber: "PO-2526-030",
    invoiceAmount: 14000,
    poAmount: 14000,
    receiptConfirmed: false,
    matchStatus: "Pending",
    invoiceDate: "11 May 2026",
    dueDate: "10 Jun 2026",
  },
  {
    invoiceNo: "INV-SI-6610",
    vendor: "Survey Instruments India",
    poNumber: "PO-2526-029",
    invoiceAmount: 22500,
    poAmount: 22500,
    receiptConfirmed: false,
    matchStatus: "Pending",
    invoiceDate: "05 May 2026",
    dueDate: "04 Jun 2026",
  },
  {
    invoiceNo: "INV-CL-3309",
    vendor: "Camlin Ltd.",
    poNumber: "PO-2526-028",
    invoiceAmount: 16800,
    poAmount: 16800,
    receiptConfirmed: true,
    matchStatus: "Matched",
    invoiceDate: "03 May 2026",
    dueDate: "02 Jun 2026",
  },
];

const MATCH_STYLES: Record<string, string> = {
  Matched:     "bg-green-50 text-green-700",
  Pending:     "bg-amber-50 text-amber-700",
  Discrepancy: "bg-red-50 text-[#E05A4E]",
};

const SUMMARY_CARDS = [
  { label: "Total Outstanding",   value: "₹74,050",  color: "#E05A4E", bg: "#FEF2F1" },
  { label: "3-Way Match Pending", value: "5",         color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Approved for Payment",value: "₹38,200",  color: "#22C55E", bg: "#F0FDF4" },
  { label: "Overdue",             value: "₹12,800",  color: "#8B5CF6", bg: "#F5F3FF" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function PayablesPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payables &amp; 3-Way Match</h1>
          <p className="text-xs text-gray-400 mt-0.5">Step 10 — Vendor Invoice × PO × Delivery Receipt verification</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-[#E05A4E] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Invoice
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {SUMMARY_CARDS.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="h-10 w-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: c.bg }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={c.color} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* 3-Way Match explainer */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">How 3-Way Matching Works</h2>
        <div className="flex items-center gap-4">
          {[
            { label: "Vendor Tax Invoice", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z", color: "#3B82F6", bg: "#EFF6FF" },
            { label: "Purchase Order", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "#E05A4E", bg: "#FEF2F1" },
            { label: "Delivery Receipt (GRN)", icon: "M5 13l4 4L19 7", color: "#22C55E", bg: "#F0FDF4" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 flex-1">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={item.color} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">{item.label}</p>
                <p className="text-[10px] text-gray-400">Document {i + 1} of 3</p>
              </div>
              {i < 2 && (
                <svg className="w-5 h-5 text-gray-300 flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
            <div className="h-10 w-10 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Auto-matched</p>
              <p className="text-[10px] text-gray-400">Finance Module Release</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Invoice Matching Register</h2>
          <div className="flex items-center gap-2">
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none">
              <option>All Status</option>
              <option>Matched</option>
              <option>Pending</option>
              <option>Discrepancy</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Invoice No.", "Vendor", "PO Number", "Invoice Amt", "PO Amount", "Receipt", "Match Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {INVOICES.map((inv) => {
                const discrepancy = inv.invoiceAmount !== inv.poAmount;
                return (
                  <tr key={inv.invoiceNo} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-[#E05A4E]">{inv.invoiceNo}</p>
                      <p className="text-[10px] text-gray-400">{inv.invoiceDate}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-700 max-w-[160px] truncate">{inv.vendor}</td>
                    <td className="px-4 py-3.5 text-sm font-mono text-gray-500">{inv.poNumber}</td>
                    <td className={`px-4 py-3.5 text-sm font-semibold ${discrepancy ? "text-[#E05A4E]" : "text-gray-800"}`}>
                      {fmt(inv.invoiceAmount)}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-800">{fmt(inv.poAmount)}</td>
                    <td className="px-4 py-3.5">
                      {inv.receiptConfirmed ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-700 px-2.5 py-0.5 text-xs font-medium">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          GRN Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2.5 py-0.5 text-xs font-medium">
                          Awaiting GRN
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${MATCH_STYLES[inv.matchStatus] ?? "bg-gray-100 text-gray-600"}`}>
                        {inv.matchStatus === "Discrepancy" && (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {inv.matchStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {inv.matchStatus === "Matched" && inv.receiptConfirmed ? (
                        <button className="text-xs bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 rounded-lg px-2.5 py-1 font-medium transition-colors whitespace-nowrap">
                          Release Payment
                        </button>
                      ) : inv.matchStatus === "Discrepancy" ? (
                        <button className="text-xs bg-red-50 text-[#E05A4E] border border-red-200 hover:bg-red-100 rounded-lg px-2.5 py-1 font-medium transition-colors whitespace-nowrap">
                          Raise Query
                        </button>
                      ) : (
                        <button className="text-xs bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 rounded-lg px-2.5 py-1 font-medium transition-colors whitespace-nowrap">
                          Confirm GRN
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {INVOICES.filter(i => i.matchStatus === "Matched").length} matched ·
            {" "}{INVOICES.filter(i => i.matchStatus === "Pending").length} pending ·
            {" "}{INVOICES.filter(i => i.matchStatus === "Discrepancy").length} discrepancy
          </p>
          <p className="text-xs text-gray-400">100% audit-ready · All transactions logged</p>
        </div>
      </div>
    </div>
  );
}

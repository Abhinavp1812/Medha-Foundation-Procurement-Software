import Link from "next/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const REQUESTS = [
  {
    prNumber: "PR-2526-001",
    description: "Laptop – Dell Inspiron 15",
    department: "IT & Infrastructure",
    requestedBy: "Rahul Sharma",
    amount: 68000,
    status: "Budget Check",
    stage: "Finance Review",
    date: "12 May 2026",
  },
  {
    prNumber: "PR-2526-002",
    description: "Office Chairs (×10)",
    department: "Administration",
    requestedBy: "Priya Verma",
    amount: 32000,
    status: "Approved",
    stage: "PO Issuance",
    date: "10 May 2026",
  },
  {
    prNumber: "PR-2526-003",
    description: "Training Workshop – MS Excel",
    department: "Training & Events",
    requestedBy: "Anil Kumar",
    amount: 15000,
    status: "Submitted",
    stage: "Manager Approval",
    date: "09 May 2026",
  },
  {
    prNumber: "PR-2526-004",
    description: "Generator Fuel – 50 Litres",
    department: "Field Operations",
    requestedBy: "Sunita Rao",
    amount: 4800,
    status: "Approved",
    stage: "Completed",
    date: "08 May 2026",
  },
  {
    prNumber: "PR-2526-005",
    description: "Projector – Epson EB-S41",
    department: "Training & Events",
    requestedBy: "Deepak Nair",
    amount: 28500,
    status: "Submitted",
    stage: "Dept Head Approval",
    date: "07 May 2026",
  },
  {
    prNumber: "PR-2526-006",
    description: "Stationery & Print Supplies",
    department: "Administration",
    requestedBy: "Meena Joshi",
    amount: 6200,
    status: "Draft",
    stage: "Not Submitted",
    date: "06 May 2026",
  },
  {
    prNumber: "PR-2526-007",
    description: "Server Rack – APC 42U",
    department: "IT & Infrastructure",
    requestedBy: "Kiran Pillai",
    amount: 1,
    status: "Rejected",
    stage: "Returned",
    date: "05 May 2026",
  },
  {
    prNumber: "PR-2526-008",
    description: "Field Survey Kits (×5)",
    department: "Field Operations",
    requestedBy: "Ravi Gupta",
    amount: 22500,
    status: "Budget Check",
    stage: "Finance Review",
    date: "04 May 2026",
  },
];

// Fix the server-rack amount placeholder
REQUESTS[6].amount = 145000;

const STATUS_STYLES: Record<string, string> = {
  Draft:         "bg-gray-100 text-gray-600",
  Submitted:     "bg-blue-50 text-blue-700",
  "Budget Check":"bg-amber-50 text-amber-700",
  Approved:      "bg-green-50 text-green-700",
  Rejected:      "bg-red-50 text-[#E05A4E]",
};

const STATUS_COUNTS = [
  { label: "Draft",        count: 1,  color: "#9CA3AF" },
  { label: "Submitted",    count: 2,  color: "#3B82F6" },
  { label: "Budget Check", count: 2,  color: "#F59E0B" },
  { label: "Approved",     count: 2,  color: "#22C55E" },
  { label: "Rejected",     count: 1,  color: "#E05A4E" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function RequestsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Purchase Requests</h1>
          <p className="text-xs text-gray-400 mt-0.5">Step 1 — Need Analysis &amp; Department Submission</p>
        </div>
        <Link href="/admin/purchase-request"
          className="flex items-center gap-2 bg-[#E05A4E] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Request
        </Link>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {STATUS_COUNTS.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.count}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">All Requests</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-40"
                placeholder="Search requests…"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["PR Number", "Item / Description", "Department", "Requested By", "Amount (₹)", "Status", "Approval Stage", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {REQUESTS.map((r) => (
                <tr key={r.prNumber} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-sm font-medium text-[#E05A4E] whitespace-nowrap">{r.prNumber}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-800 max-w-[200px] truncate">{r.description}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">{r.department}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">{r.requestedBy}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">{fmt(r.amount)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{r.stage}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-400 whitespace-nowrap">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing {REQUESTS.length} of {REQUESTS.length} requests</p>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-xs text-gray-500 border border-gray-200 rounded hover:bg-white transition-colors">Previous</button>
            <button className="px-2 py-1 text-xs text-white bg-[#E05A4E] border border-[#E05A4E] rounded">1</button>
            <button className="px-2 py-1 text-xs text-gray-500 border border-gray-200 rounded hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-blue-700">
          Submitted PRs are auto-routed to the Line Manager and Department Head. Requests above ₹50,000 are automatically
          flagged to Finance for budgetary validation (Step 2).
        </p>
      </div>
    </div>
  );
}

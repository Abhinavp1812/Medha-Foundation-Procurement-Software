// ─── Approval Tiers (from PDF) ────────────────────────────────────────────────
const APPROVAL_MATRIX = [
  {
    tier: 1,
    range: "≤ ₹5,000",
    authority: "Program / Domain Manager",
    type: "Single Approval",
    mechanism: "Digital Sign-off",
    sla: "1 day",
    color: "#22C55E",
  },
  {
    tier: 2,
    range: "₹5,001 – ₹20,000",
    authority: "Regional / State Leads",
    type: "Single Approval",
    mechanism: "Digital Sign-off",
    sla: "1 day",
    color: "#86EFAC",
  },
  {
    tier: 3,
    range: "₹20,001 – ₹50,000",
    authority: "Department Head",
    type: "Email-based Concurrence",
    mechanism: "Email Confirmation",
    sla: "2 days",
    color: "#F59E0B",
  },
  {
    tier: 4,
    range: "₹50,001 – ₹5,00,000",
    authority: "PC Core Group (3 Members)",
    type: "Committee Minutes",
    mechanism: "Meeting Minutes",
    sla: "3 days",
    color: "#F97316",
  },
  {
    tier: 5,
    range: "₹5,00,001 – ₹20,00,000",
    authority: "PAF Heads Committee",
    type: "Unanimous Concurrence",
    mechanism: "Formal Resolution",
    sla: "5 days",
    color: "#8B5CF6",
  },
  {
    tier: 6,
    range: "> ₹20,00,000",
    authority: "Board of Directors",
    type: "Board Resolution",
    mechanism: "Board Meeting Resolution",
    sla: "7 days",
    color: "#E05A4E",
  },
];

// ─── Pending Approvals ────────────────────────────────────────────────────────
const PENDING = [
  {
    prNumber: "PR-2526-001",
    description: "Laptop – Dell Inspiron 15",
    amount: 68000,
    requester: "Rahul Sharma",
    dept: "IT & Infrastructure",
    authority: "PC Core Group",
    tier: 4,
    daysWaiting: 2,
    urgent: true,
  },
  {
    prNumber: "PR-2526-003",
    description: "Training Workshop – MS Excel",
    amount: 15000,
    requester: "Anil Kumar",
    dept: "Training & Events",
    authority: "Regional Lead",
    tier: 2,
    daysWaiting: 1,
    urgent: false,
  },
  {
    prNumber: "PR-2526-005",
    description: "Projector – Epson EB-S41",
    amount: 28500,
    requester: "Deepak Nair",
    dept: "Training & Events",
    authority: "Department Head",
    tier: 3,
    daysWaiting: 3,
    urgent: true,
  },
  {
    prNumber: "PR-2526-008",
    description: "Field Survey Kits (×5)",
    amount: 22500,
    requester: "Ravi Gupta",
    dept: "Field Operations",
    authority: "Department Head",
    tier: 3,
    daysWaiting: 4,
    urgent: true,
  },
  {
    prNumber: "PR-2526-009",
    description: "Annual Maintenance Contract – HVAC",
    amount: 95000,
    requester: "Neha Singh",
    dept: "Administration",
    authority: "PC Core Group",
    tier: 4,
    daysWaiting: 1,
    urgent: false,
  },
  {
    prNumber: "PR-2526-010",
    description: "Tablet Devices for Field Staff (×8)",
    amount: 3200,
    requester: "Suresh Babu",
    dept: "Field Operations",
    authority: "Program Manager",
    tier: 1,
    daysWaiting: 0,
    urgent: false,
  },
];

// Fix tier-1 amount
PENDING[5].amount = 32000;
PENDING[5].tier = 3;
PENDING[5].authority = "Department Head";

const TIER_COLORS: Record<number, string> = {
  1: "bg-green-50 text-green-700",
  2: "bg-emerald-50 text-emerald-700",
  3: "bg-amber-50 text-amber-700",
  4: "bg-orange-50 text-orange-700",
  5: "bg-purple-50 text-purple-700",
  6: "bg-red-50 text-red-700",
};

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function ApprovalsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Approvals</h1>
          <p className="text-xs text-gray-400 mt-0.5">Steps 3–5 — Rule-Based Authorization Engine</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {PENDING.filter(p => p.urgent).length} urgent
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1">
            {PENDING.length} total pending
          </span>
        </div>
      </div>

      {/* ── Section 1: Approval Matrix ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Authorization Matrix</h2>
          <p className="text-xs text-gray-400 mt-0.5">Approval authority is determined automatically based on purchase value</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Tier", "Value Range", "Approving Authority", "Approval Type", "Mechanism", "SLA"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {APPROVAL_MATRIX.map((row) => (
                <tr key={row.tier} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full text-white text-xs font-bold"
                      style={{ background: row.color }}>
                      {row.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">{row.range}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">{row.authority}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.mechanism}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium">
                      {row.sla}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 2: Pending Approvals ────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Pending Approvals</h2>
          <div className="flex items-center gap-2">
            <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
              Filter by tier
            </button>
            <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
              Sort by amount
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {PENDING.map((item) => (
            <div key={item.prNumber} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  {/* Tier badge */}
                  <div className="flex-shrink-0 mt-0.5">
                    <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${TIER_COLORS[item.tier]}`}>
                      T{item.tier}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[#E05A4E]">{item.prNumber}</span>
                      {item.urgent && (
                        <span className="inline-flex items-center rounded-full bg-red-50 text-[#E05A4E] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-800 truncate">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.requester} · {item.dept} · Waiting {item.daysWaiting === 0 ? "today" : `${item.daysWaiting}d`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">{fmt(item.amount)}</p>
                    <p className="text-xs text-gray-400">{item.authority}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button className="flex items-center gap-1.5 bg-red-50 text-[#E05A4E] border border-red-200 hover:bg-red-100 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400">
            Approvals are auto-routed per the authorization matrix. Bypassing L1 (lowest bidder) triggers a mandatory Variance Note.
          </p>
        </div>
      </div>
    </div>
  );
}

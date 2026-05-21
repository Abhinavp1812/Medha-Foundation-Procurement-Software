// ─── Budget Data ──────────────────────────────────────────────────────────────
const OVERALL = {
  fy: "FY 2025–26",
  totalBudget: 250000,
  spent: 184650,
  committed: 38500,
  available: 26850,
};

const BUDGET_CATS = [
  {
    category: "IT & Infrastructure",
    allocated: 80000,
    spent: 61200,
    committed: 12000,
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    category: "Office Supplies",
    allocated: 40000,
    spent: 34800,
    committed: 3200,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    category: "Training & Events",
    allocated: 65000,
    spent: 48950,
    committed: 14200,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    category: "Field Operations",
    allocated: 65000,
    spent: 39700,
    committed: 7100,
    color: "#22C55E",
    bg: "#F0FDF4",
  },
  {
    category: "Travel & Logistics",
    allocated: 0,
    spent: 0,
    committed: 2000,
    color: "#E05A4E",
    bg: "#FEF2F1",
  },
];

// Fix travel allocation
BUDGET_CATS[4].allocated = 30000;
BUDGET_CATS[4].spent = 15000;

// ─── Recent Budget Events ──────────────────────────────────────────────────────
const EVENTS = [
  { label: "PR-2526-001 flagged to Finance",       type: "Flag",     date: "12 May 2026", amount: 68000  },
  { label: "PO-2526-033 committed (Furniture)",    type: "Committed",date: "12 May 2026", amount: 32000  },
  { label: "Invoice cleared – Dell Laptops",        type: "Cleared",  date: "10 May 2026", amount: 68000  },
  { label: "PR-2526-008 budget pre-approved",       type: "Approved", date: "09 May 2026", amount: 22500  },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const overallPct = Math.round((OVERALL.spent / OVERALL.totalBudget) * 100);
const committedPct = Math.round((OVERALL.committed / OVERALL.totalBudget) * 100);

export default function BudgetsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Step 2 — Budgetary Validation · Requests above ₹50,000 auto-flagged to Finance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button className="flex items-center gap-2 bg-[#E05A4E] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Budget Head
          </button>
        </div>
      </div>

      {/* ── Overall Budget Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{OVERALL.fy}</p>
            <h2 className="text-sm font-semibold text-gray-800 mt-0.5">Overall Budget Utilization</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              overallPct > 90 ? "bg-red-50 text-[#E05A4E]" : overallPct > 75 ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
            }`}>
              {overallPct}% utilized
            </span>
          </div>
        </div>

        {/* Four key numbers */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {[
            { label: "Total Budget",  value: OVERALL.totalBudget,  color: "#374151", bg: "#F9FAFB" },
            { label: "Spent",         value: OVERALL.spent,         color: "#E05A4E", bg: "#FEF2F1" },
            { label: "Committed",     value: OVERALL.committed,     color: "#F59E0B", bg: "#FFFBEB" },
            { label: "Available",     value: OVERALL.available,     color: "#22C55E", bg: "#F0FDF4" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-4" style={{ background: item.bg }}>
              <p className="text-[11px] text-gray-500 mb-1">{item.label}</p>
              <p className="text-xl font-bold" style={{ color: item.color }}>{fmt(item.value)}</p>
            </div>
          ))}
        </div>

        {/* Stacked progress bar */}
        <div className="mb-2">
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5 bg-gray-100">
            <div className="rounded-l-full bg-[#E05A4E] transition-all"
              style={{ width: `${overallPct}%` }} />
            <div className="bg-[#F59E0B] transition-all"
              style={{ width: `${committedPct}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E05A4E]" />Spent {overallPct}%</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F59E0B]" />Committed {committedPct}%</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-200" />Available {Math.round((OVERALL.available / OVERALL.totalBudget) * 100)}%</span>
        </div>
      </div>

      {/* ── Category Table ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Budget by Category</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Category", "Allocated (₹)", "Spent (₹)", "Committed (₹)", "Available (₹)", "Utilization"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {BUDGET_CATS.map((cat) => {
                const available = cat.allocated - cat.spent - cat.committed;
                const spentPct = Math.round((cat.spent / cat.allocated) * 100);
                const commitPct = Math.round((cat.committed / cat.allocated) * 100);
                const totalUsedPct = Math.min(spentPct + commitPct, 100);
                const overBudget = (cat.spent + cat.committed) > cat.allocated;

                return (
                  <tr key={cat.category} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: cat.bg }}>
                          <span className="h-3 w-3 rounded-full" style={{ background: cat.color }} />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{cat.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-700">{fmt(cat.allocated)}</td>
                    <td className="px-4 py-4 text-sm font-semibold" style={{ color: cat.color }}>{fmt(cat.spent)}</td>
                    <td className="px-4 py-4 text-sm text-amber-600 font-medium">{fmt(cat.committed)}</td>
                    <td className={`px-4 py-4 text-sm font-semibold ${available < 0 ? "text-[#E05A4E]" : "text-green-700"}`}>
                      {fmt(Math.max(available, 0))}
                    </td>
                    <td className="px-4 py-4 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="h-2 rounded-full flex gap-0.5 overflow-hidden" style={{ width: `${totalUsedPct}%` }}>
                            <div className="flex-1 rounded-full" style={{ background: overBudget ? "#E05A4E" : cat.color }} />
                          </div>
                        </div>
                        <span className={`text-xs font-semibold w-8 flex-shrink-0 text-right ${overBudget ? "text-[#E05A4E]" : "text-gray-600"}`}>
                          {spentPct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Recent Budget Events ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Recent Budget Activity</h2>
        <div className="space-y-3">
          {EVENTS.map((ev, i) => {
            const typeStyle: Record<string, string> = {
              Flag:      "bg-red-50 text-[#E05A4E]",
              Committed: "bg-amber-50 text-amber-700",
              Cleared:   "bg-green-50 text-green-700",
              Approved:  "bg-blue-50 text-blue-700",
            };
            return (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeStyle[ev.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {ev.type}
                  </span>
                  <span className="text-sm text-gray-700">{ev.label}</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className="text-xs text-gray-400">{ev.date}</span>
                  <span className="text-sm font-semibold text-gray-700 min-w-[90px]">{fmt(ev.amount)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

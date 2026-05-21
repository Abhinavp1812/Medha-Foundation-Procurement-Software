import Link from "next/link";
import { SpendChart } from "@/components/SpendChart";

// ─── Attention Required ───────────────────────────────────────────────────────
const ATTENTION = [
  { label: "PRs to be processed",       value: 14, urgent: true  },
  { label: "PRs pending approval",       value:  7, urgent: false },
  { label: "Budget checks overdue",      value:  3, urgent: true  },
  { label: "Vendors to be onboarded",   value: 18, urgent: true  },
  { label: "RFQs under evaluation",     value: 11, urgent: false },
  { label: "Quotes to be compared",     value:  6, urgent: false },
  { label: "POs to be issued",          value:  4, urgent: false },
  { label: "3-Way matches pending",     value:  5, urgent: true  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "POs Issued", value: 34,
    bg: "#FEF2F1", color: "#E05A4E",
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  },
  {
    label: "Bills Processed", value: 128,
    bg: "#EFF6FF", color: "#3B82F6",
    icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z",
  },
  {
    label: "Items Catalogued", value: 87,
    bg: "#F0FDF4", color: "#22C55E",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    label: "Active Vendors", value: 23,
    bg: "#FFFBEB", color: "#F59E0B",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

// ─── Bill aging ───────────────────────────────────────────────────────────────
const AGING = [
  { label: "Current (0–30 days)",   amount: 42300, color: "#22C55E", pct: 57 },
  { label: "31–60 days overdue",    amount: 18750, color: "#F59E0B", pct: 25 },
  { label: "61–90 days overdue",    amount:  9200, color: "#F97316", pct: 13 },
  { label: "90+ days overdue",      amount:  3800, color: "#E05A4E", pct:  5 },
];

// ─── Budget categories ────────────────────────────────────────────────────────
const BUDGET_CATS = [
  { label: "IT & Infrastructure",  allocated: 80000, spent: 61200 },
  { label: "Office Supplies",      allocated: 40000, spent: 34800 },
  { label: "Training & Events",    allocated: 65000, spent: 48950 },
  { label: "Field Operations",     allocated: 65000, spent: 39700 },
];

// ─── Procurement lifecycle steps ──────────────────────────────────────────────
const LIFECYCLE = [
  { step: "1", label: "Need Analysis",    pending: 14, href: "/admin/requests",        color: "#E05A4E" },
  { step: "2", label: "Budget Check",     pending:  3, href: "/admin/budgets",         color: "#F97316" },
  { step: "3", label: "Approvals",        pending:  7, href: "/admin/approvals",       color: "#F59E0B" },
  { step: "4", label: "Quote Sourcing",   pending:  6, href: "/admin/rfq",             color: "#3B82F6" },
  { step: "5", label: "A&IC Review",      pending:  2, href: "/admin/approvals",       color: "#8B5CF6" },
  { step: "6", label: "PO Issuance",      pending:  4, href: "/admin/purchase-orders", color: "#10B981" },
  { step: "7", label: "3-Way Match",      pending:  5, href: "/admin/payables",        color: "#06B6D4" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-3 mb-0.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#E05A4E] to-[#B03A2E] text-white flex items-center justify-center text-sm font-bold">
              MA
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">Hello, Medha Admin!</h1>
              <p className="text-xs text-gray-400">Medha Skilling Foundation</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:border-gray-300 transition-colors shadow-sm">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-gray-700">Date Range:</span>
          <span>FY 2025–26</span>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-gray-200 mb-5">
        {["My Home", "Dashboard", "Getting Started"].map((tab) => (
          <button key={tab}
            className={`px-4 py-2.5 text-sm transition-colors ${
              tab === "Dashboard"
                ? "text-[#E05A4E] font-semibold border-b-2 border-[#E05A4E] -mb-px"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Procurement Lifecycle Status Row ────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">Procurement Lifecycle — Pending Items</h2>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Live Status</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {LIFECYCLE.map((step, i) => (
            <div key={step.step} className="flex items-center gap-1 flex-shrink-0">
              <Link href={step.href}
                className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group min-w-[96px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-white rounded-full h-4 w-4 flex items-center justify-center flex-shrink-0"
                    style={{ background: step.color }}>
                    {step.step}
                  </span>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-800 whitespace-nowrap">{step.label}</span>
                </div>
                <span className="text-xl font-bold" style={{ color: step.pending > 3 ? step.color : "#374151" }}>
                  {step.pending}
                </span>
              </Link>
              {i < LIFECYCLE.length - 1 && (
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 1: Spend Summary + Attention Required ───────────────────── */}
      <div className="grid grid-cols-5 gap-5 mb-5">

        {/* Spend Summary */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Spend Summary</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">FY 2025–26</span>
          </div>

          <div className="flex items-end gap-8 mb-5">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">₹1,84,650</p>
            </div>
            <div className="flex items-center gap-6 mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E05A4E] flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-gray-400">PO Spend</p>
                  <p className="text-sm font-semibold text-gray-700">₹1,12,400</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-gray-400">Non-PO Spend</p>
                  <p className="text-sm font-semibold text-gray-700">₹72,250</p>
                </div>
              </div>
            </div>
          </div>

          <SpendChart />
        </div>

        {/* Attention Required */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Attention Required</h2>
            <span className="h-5 w-5 rounded-full bg-[#E05A4E] text-white text-[10px] font-bold flex items-center justify-center">
              {ATTENTION.filter((a) => a.urgent).length}
            </span>
          </div>

          <div>
            {ATTENTION.map((item, i) => (
              <div key={item.label}
                className={`flex items-center justify-between py-2.5 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors ${
                  i < ATTENTION.length - 1 ? "border-b border-gray-50" : ""
                }`}>
                <div className="flex items-center gap-2">
                  {item.urgent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E05A4E] flex-shrink-0" />
                  )}
                  {!item.urgent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className={`text-sm font-bold min-w-[24px] text-right ${
                  item.urgent ? "text-[#E05A4E]" : "text-gray-800"
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Stats ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5 mb-5">
        {STATS.map((s) => (
          <div key={s.label}
            className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 leading-tight">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 3: Bill Aging + Budget Summary ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-5">

        {/* Bill Aging Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Bill Aging Summary</h2>
            <span className="text-xs text-gray-400">Total outstanding: ₹74,050</span>
          </div>

          <div className="flex h-2.5 rounded-full overflow-hidden mb-4 gap-px">
            {AGING.map((a) => (
              <div key={a.label} className="rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
            ))}
          </div>

          <div className="space-y-3">
            {AGING.map((a) => (
              <div key={a.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                  <span className="text-sm text-gray-600">{a.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-16 text-right">{fmt(a.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Budget Summary</h2>
            <Link href="/admin/budgets" className="text-xs text-[#E05A4E] hover:underline font-medium">
              View all →
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Overall utilization</span>
              <span className="text-xs font-semibold text-gray-700">73.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-[#E05A4E]" style={{ width: "73.9%" }} />
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-gray-400">
              <span>Spent: ₹1,84,650</span>
              <span>Committed: ₹38,500</span>
              <span>Available: ₹26,850</span>
            </div>
          </div>

          <div className="space-y-3">
            {BUDGET_CATS.map((cat) => {
              const pct = Math.round((cat.spent / cat.allocated) * 100);
              const over = pct > 90;
              return (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{cat.label}</span>
                    <span className={`text-xs font-semibold ${over ? "text-[#E05A4E]" : "text-gray-700"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        background: over ? "#E05A4E" : "#3B82F6",
                      }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

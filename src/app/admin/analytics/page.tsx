// ─── KPI Data ─────────────────────────────────────────────────────────────────
const KPIS = [
  { label: "Active PRs",     value: "47",   sub: "7 require urgent action",   color: "#E05A4E", bg: "#FEF2F1" },
  { label: "POs Issued",     value: "34",   sub: "This financial year",        color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Avg Cycle Time", value: "3.2d", sub: "vs 15 days manual process",  color: "#22C55E", bg: "#F0FDF4" },
  { label: "Compliance Rate",value: "94%",  sub: "Quote & approval adherence", color: "#8B5CF6", bg: "#F5F3FF" },
];

// ─── Approval Tier Distribution ───────────────────────────────────────────────
const TIER_DATA = [
  { tier: "Tier 1 (≤₹5k)",         count: 12, color: "#22C55E", pct: 26 },
  { tier: "Tier 2 (₹5k–20k)",      count: 18, color: "#86EFAC", pct: 38 },
  { tier: "Tier 3 (₹20k–50k)",     count:  9, color: "#F59E0B", pct: 19 },
  { tier: "Tier 4 (₹50k–5L)",      count:  5, color: "#F97316", pct: 11 },
  { tier: "Tier 5 (₹5L–20L)",      count:  2, color: "#8B5CF6", pct:  4 },
  { tier: "Tier 6 (>₹20L)",        count:  1, color: "#E05A4E", pct:  2 },
];

// ─── Monthly Spend Trend ──────────────────────────────────────────────────────
const MONTHLY = [
  { month: "Nov 25", spend: 18200, pos: 4 },
  { month: "Dec 25", spend: 22400, pos: 5 },
  { month: "Jan 26", spend: 31800, pos: 7 },
  { month: "Feb 26", spend: 28500, pos: 6 },
  { month: "Mar 26", spend: 42600, pos: 8 },
  { month: "Apr 26", spend: 19800, pos: 4 },
  { month: "May 26", spend: 21350, pos: 4 },
];

const maxSpend = Math.max(...MONTHLY.map(m => m.spend));

// ─── Quote Compliance Stats ───────────────────────────────────────────────────
const QUOTE_STATS = [
  { label: "Zero-Quote PRs",   value: 14, desc: "≤ ₹20,000 — Auto-processed", color: "#22C55E", bg: "#F0FDF4" },
  { label: "2-Quote PRs",      value: 11, desc: "₹20,001–₹50,000",            color: "#F59E0B", bg: "#FFFBEB" },
  { label: "3-Quote PRs",      value: 22, desc: "> ₹50,001 — A&IC reviewed",  color: "#E05A4E", bg: "#FEF2F1" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Procurement Analytics</h1>
          <p className="text-xs text-gray-400 mt-0.5">Digital procurement performance — Medha Skilling Foundation, FY 2025–26</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* ── Hero Metric: TAT Reduction ─────────────────────────────────── */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-[0.03] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-[0.03] translate-y-1/2 -translate-x-1/4" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-green-500 bg-opacity-20 text-green-400 text-xs font-semibold px-3 py-1">
              ✓ Key Impact Metric
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-1">80% Reduction in Procurement TAT</h2>
          <p className="text-gray-400 text-sm mb-6">
            Medha Foundation's digital procurement workflow compresses the end-to-end procurement cycle from 15 working days to just 3 days.
          </p>

          {/* Visual comparison */}
          <div className="grid grid-cols-2 gap-8">
            {/* Manual */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Manual Process</p>
              <div className="flex items-end gap-1 mb-2">
                {[15].map((v) => (
                  <div key={v} className="w-full bg-gray-700 rounded-t-lg" style={{ height: "120px" }}>
                    <div className="h-full flex flex-col items-center justify-center gap-1">
                      <span className="text-4xl font-black text-gray-300">15</span>
                      <span className="text-xs text-gray-500">working days</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Paper forms",
                  "Manual routing",
                  "Physical signatures",
                  "No tracking",
                  "Lost documents",
                ].map((t) => (
                  <span key={t} className="text-[10px] bg-gray-700 text-gray-400 rounded px-1.5 py-0.5">{t}</span>
                ))}
              </div>
            </div>

            {/* Digital */}
            <div>
              <p className="text-xs text-green-500 uppercase tracking-wider mb-3">Digital Process (Medha)</p>
              <div className="flex items-end gap-1 mb-2">
                {[3].map((v) => (
                  <div key={v} className="w-full rounded-t-lg" style={{ height: "24px", background: "linear-gradient(135deg, #E05A4E, #B03A2E)" }}>
                    <div className="h-full flex flex-col items-center justify-center gap-0.5">
                      <span className="text-lg font-black text-white">3</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-500">working days</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Auto-routing",
                  "Digital approvals",
                  "Real-time tracking",
                  "E-signatures",
                  "100% audit trail",
                ].map((t) => (
                  <span key={t} className="text-[10px] bg-green-900 bg-opacity-40 text-green-400 rounded px-1.5 py-0.5">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow connecting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <div className="bg-[#E05A4E] rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 KPI Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={k.color} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-3xl font-extrabold text-gray-900" style={{ color: k.color }}>{k.value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-1">{k.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Row: Tier Distribution + Monthly Spend ───────────────────────── */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Approval Tier Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Approval Tier Distribution</h2>
            <span className="text-xs text-gray-400">47 total PRs</span>
          </div>

          {/* Stacked bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-px">
            {TIER_DATA.map((t) => (
              <div key={t.tier} title={t.tier}
                className="rounded-full transition-all hover:opacity-90"
                style={{ width: `${t.pct}%`, background: t.color }} />
            ))}
          </div>

          <div className="space-y-3">
            {TIER_DATA.map((t) => (
              <div key={t.tier} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 truncate">{t.tier}</span>
                    <span className="text-xs font-semibold text-gray-700 ml-2">{t.count} PRs</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${t.pct}%`, background: t.color }} />
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0">{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Spend Trend */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Monthly Spend Trend</h2>
            <span className="text-xs text-gray-400">Last 7 months</span>
          </div>

          {/* Bar chart (CSS-based) */}
          <div className="flex items-end gap-2 h-36 mb-3">
            {MONTHLY.map((m) => {
              const heightPct = Math.round((m.spend / maxSpend) * 100);
              const isCurrent = m.month === "May 26";
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full relative flex flex-col items-center justify-end" style={{ height: "120px" }}>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10">
                      {fmt(m.spend)}
                    </div>
                    <div className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${heightPct}%`,
                        background: isCurrent ? "#E05A4E" : "#E5E7EB",
                        minHeight: "4px",
                      }} />
                  </div>
                  <span className={`text-[10px] text-center ${isCurrent ? "text-[#E05A4E] font-semibold" : "text-gray-400"}`}>
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary row */}
          <div className="pt-3 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-gray-400">Total (7m)</p>
                <p className="text-sm font-bold text-gray-800">{fmt(MONTHLY.reduce((s, m) => s + m.spend, 0))}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Avg / Month</p>
                <p className="text-sm font-bold text-gray-800">
                  {fmt(Math.round(MONTHLY.reduce((s, m) => s + m.spend, 0) / MONTHLY.length))}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Peak Month</p>
                <p className="text-sm font-bold text-gray-800">Mar 26</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quote Compliance Stats ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Quote Compliance Statistics</h2>
          <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 text-xs font-semibold px-3 py-1">
            94% compliant
          </span>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {QUOTE_STATS.map((q) => (
            <div key={q.label} className="rounded-xl p-4 border border-gray-100" style={{ background: q.bg }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-3xl font-extrabold" style={{ color: q.color }}>{q.value}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{q.label}</p>
                </div>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: "white" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={q.color} strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500">{q.desc}</p>
              <div className="mt-3 w-full bg-white rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{
                  width: `${Math.round((q.value / 47) * 100)}%`,
                  background: q.color,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 10-Step Process Compliance ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">10-Step Lifecycle Compliance Snapshot</h2>
        <div className="grid grid-cols-5 gap-3">
          {[
            { step: "1", label: "Need Analysis",    compliance: 100, volume: 47 },
            { step: "2", label: "Budget Check",     compliance: 97,  volume: 47 },
            { step: "3", label: "Approval",         compliance: 94,  volume: 44 },
            { step: "4", label: "Quote Sourcing",   compliance: 91,  volume: 38 },
            { step: "5", label: "A&IC Review",      compliance: 96,  volume: 35 },
            { step: "6", label: "Comparison Matrix",compliance: 93,  volume: 35 },
            { step: "7", label: "L1 Identification",compliance: 89,  volume: 35 },
            { step: "8", label: "Digital Minutes",  compliance: 95,  volume: 8  },
            { step: "9", label: "PO Issuance",      compliance: 100, volume: 34 },
            { step: "10",label: "3-Way Match",      compliance: 87,  volume: 28 },
          ].map((s) => (
            <div key={s.step} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="h-5 w-5 rounded-full bg-[#E05A4E] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {s.step}
                </span>
                <span className="text-[11px] text-gray-600 font-medium leading-tight">{s.label}</span>
              </div>
              <p className={`text-xl font-black ${s.compliance >= 95 ? "text-green-600" : s.compliance >= 90 ? "text-amber-600" : "text-[#E05A4E]"}`}>
                {s.compliance}%
              </p>
              <p className="text-[10px] text-gray-400">{s.volume} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

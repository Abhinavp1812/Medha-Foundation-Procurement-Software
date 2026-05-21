// ─── Mock Purchase Orders Data ────────────────────────────────────────────────
const PURCHASE_ORDERS = [
  {
    poNumber: "PO-2526-034",
    vendor: "Dell India Pvt. Ltd.",
    description: "Laptop – Dell Inspiron 15 (×1)",
    amount: 68000,
    issueDate: "15 May 2026",
    expectedDelivery: "22 May 2026",
    status: "Acknowledged",
    prRef: "PR-2526-001",
  },
  {
    poNumber: "PO-2526-033",
    vendor: "Featherlite Furniture",
    description: "Ergonomic Office Chairs (×10)",
    amount: 32000,
    issueDate: "12 May 2026",
    expectedDelivery: "19 May 2026",
    status: "Delivered",
    prRef: "PR-2526-002",
  },
  {
    poNumber: "PO-2526-032",
    vendor: "Epson India Pvt. Ltd.",
    description: "Projector – Epson EB-S41 (×1)",
    amount: 28500,
    issueDate: "10 May 2026",
    expectedDelivery: "17 May 2026",
    status: "Issued",
    prRef: "PR-2526-005",
  },
  {
    poNumber: "PO-2526-031",
    vendor: "HPCL Retail",
    description: "Generator Fuel – Diesel 50L",
    amount: 4800,
    issueDate: "08 May 2026",
    expectedDelivery: "08 May 2026",
    status: "Closed",
    prRef: "PR-2526-004",
  },
  {
    poNumber: "PO-2526-030",
    vendor: "Navneet Publications Ltd.",
    description: "A4 Paper – 500 Sheet Reams (×50)",
    amount: 14000,
    issueDate: "05 May 2026",
    expectedDelivery: "10 May 2026",
    status: "Delivered",
    prRef: "PR-2526-006",
  },
  {
    poNumber: "PO-2526-029",
    vendor: "Survey Instruments India",
    description: "Field Survey Kits (×5)",
    amount: 22500,
    issueDate: "02 May 2026",
    expectedDelivery: "25 May 2026",
    status: "Acknowledged",
    prRef: "PR-2526-008",
  },
  {
    poNumber: "PO-2526-028",
    vendor: "Camlin Ltd.",
    description: "Whiteboards 6×4 ft (×4)",
    amount: 16800,
    issueDate: "30 Apr 2026",
    expectedDelivery: "12 May 2026",
    status: "Closed",
    prRef: "PR-2526-007",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Draft:        "bg-gray-100 text-gray-600",
  Issued:       "bg-blue-50 text-blue-700",
  Acknowledged: "bg-amber-50 text-amber-700",
  Delivered:    "bg-green-50 text-green-700",
  Closed:       "bg-gray-100 text-gray-500",
};

const STATUS_DOT: Record<string, string> = {
  Draft:        "bg-gray-400",
  Issued:       "bg-blue-500",
  Acknowledged: "bg-amber-500",
  Delivered:    "bg-green-500",
  Closed:       "bg-gray-400",
};

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const totalValue = PURCHASE_ORDERS.reduce((s, p) => s + p.amount, 0);
const pendingDelivery = PURCHASE_ORDERS.filter(p => ["Issued", "Acknowledged"].includes(p.status)).length;
const thisMonthValue = PURCHASE_ORDERS
  .filter(p => p.issueDate.includes("May 2026"))
  .reduce((s, p) => s + p.amount, 0);

export default function PurchaseOrdersPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">Step 9 — PO &amp; Contract Issuance with Authority-Linked Signatures</p>
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
            Create PO
          </button>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[
          {
            label: "Total POs",
            value: PURCHASE_ORDERS.length,
            sub: "FY 2025–26",
            color: "#E05A4E",
            bg: "#FEF2F1",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          },
          {
            label: "Pending Delivery",
            value: pendingDelivery,
            sub: "Issued or Acknowledged",
            color: "#F59E0B",
            bg: "#FFFBEB",
            icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2L19 8",
          },
          {
            label: "This Month Value",
            value: fmt(thisMonthValue),
            sub: "May 2026",
            color: "#22C55E",
            bg: "#F0FDF4",
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">All Purchase Orders</h2>
          <div className="flex items-center gap-2">
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none">
              <option>All Status</option>
              <option>Draft</option>
              <option>Issued</option>
              <option>Acknowledged</option>
              <option>Delivered</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["PO Number", "Vendor", "Item / Description", "Amount (₹)", "Issue Date", "Exp. Delivery", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {PURCHASE_ORDERS.map((po) => (
                <tr key={po.poNumber} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-[#E05A4E]">{po.poNumber}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{po.prRef}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 max-w-[160px] truncate">{po.vendor}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[200px] truncate">{po.description}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">{fmt(po.amount)}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{po.issueDate}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{po.expectedDelivery}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[po.status] ?? "bg-gray-100 text-gray-600"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[po.status] ?? "bg-gray-400"}`} />
                      {po.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-[#E05A4E] hover:underline font-medium whitespace-nowrap">View PO</button>
                      <span className="text-gray-200">|</span>
                      <button className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap">Send</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Total PO value: <span className="font-semibold text-gray-600">{fmt(totalValue)}</span>
          </p>
          <p className="text-xs text-gray-400">Digital POs include pre-filled T&amp;C and authority-linked signatures</p>
        </div>
      </div>
    </div>
  );
}

// ─── Mock Item Master Data ────────────────────────────────────────────────────
const ITEMS = [
  {
    code: "IT-001",
    name: "Laptop – Dell Inspiron 15",
    category: "IT & Infrastructure",
    unit: "Nos",
    lastPrice: 68000,
    preferredVendor: "Dell India Pvt. Ltd.",
    status: "Active",
  },
  {
    code: "IT-002",
    name: "Wireless Mouse – Logitech M235",
    category: "IT & Infrastructure",
    unit: "Nos",
    lastPrice: 950,
    preferredVendor: "Logitech India",
    status: "Active",
  },
  {
    code: "OF-001",
    name: "Office Chair – Ergonomic",
    category: "Office Supplies",
    unit: "Nos",
    lastPrice: 3200,
    preferredVendor: "Featherlite Furniture",
    status: "Active",
  },
  {
    code: "OF-002",
    name: "A4 Paper – 500 Sheets Ream",
    category: "Office Supplies",
    unit: "Ream",
    lastPrice: 280,
    preferredVendor: "Navneet Publications",
    status: "Active",
  },
  {
    code: "TR-001",
    name: "Projector – Epson EB-S41",
    category: "Training & Events",
    unit: "Nos",
    lastPrice: 28500,
    preferredVendor: "Epson India",
    status: "Active",
  },
  {
    code: "TR-002",
    name: "Whiteboard (6×4 ft)",
    category: "Training & Events",
    unit: "Nos",
    lastPrice: 4200,
    preferredVendor: "Camlin Ltd.",
    status: "Active",
  },
  {
    code: "FO-001",
    name: "Generator Fuel – Diesel",
    category: "Field Operations",
    unit: "Litre",
    lastPrice: 96,
    preferredVendor: "HPCL Retail",
    status: "Active",
  },
  {
    code: "FO-002",
    name: "Field Survey Kit",
    category: "Field Operations",
    unit: "Kit",
    lastPrice: 4500,
    preferredVendor: "Survey Instruments India",
    status: "Active",
  },
  {
    code: "TL-001",
    name: "Bus Ticket – Intercity",
    category: "Travel & Logistics",
    unit: "Ticket",
    lastPrice: 650,
    preferredVendor: "KSRTC / MSRTC",
    status: "Active",
  },
  {
    code: "OF-003",
    name: "Printer Ink Cartridge – HP 802",
    category: "Office Supplies",
    unit: "Nos",
    lastPrice: 485,
    preferredVendor: "HP India",
    status: "Inactive",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "IT & Infrastructure": "bg-blue-50 text-blue-700",
  "Office Supplies":     "bg-gray-100 text-gray-600",
  "Training & Events":   "bg-purple-50 text-purple-700",
  "Field Operations":    "bg-green-50 text-green-700",
  "Travel & Logistics":  "bg-amber-50 text-amber-700",
};

const CATEGORIES = ["All Categories", "IT & Infrastructure", "Office Supplies", "Training & Events", "Field Operations", "Travel & Logistics"];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function ItemsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Item Master Catalog</h1>
          <p className="text-xs text-gray-400 mt-0.5">Approved items for procurement with standardised pricing</p>
        </div>
        <button className="flex items-center gap-2 bg-[#E05A4E] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Items",        value: ITEMS.length,                                   color: "#E05A4E", bg: "#FEF2F1" },
          { label: "Active",             value: ITEMS.filter(i => i.status === "Active").length, color: "#22C55E", bg: "#F0FDF4" },
          { label: "Categories",         value: 5,                                               color: "#3B82F6", bg: "#EFF6FF" },
          { label: "With Preferred Vendor", value: ITEMS.length,                                color: "#F59E0B", bg: "#FFFBEB" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg }}>
              <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
              placeholder="Search items…"
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-gray-300">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-gray-300">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Item Code", "Item Name", "Category", "Unit", "Last Price (₹)", "Preferred Vendor", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {ITEMS.map((item) => (
                <tr key={item.code} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono font-semibold text-gray-500">{item.code}</td>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[item.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{item.unit}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-800">{fmt(item.lastPrice)}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">{item.preferredVendor}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${item.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-[#E05A4E] hover:underline font-medium">Edit</button>
                      <span className="text-gray-200">|</span>
                      <button className="text-xs text-gray-400 hover:text-gray-600">View History</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing {ITEMS.length} items</p>
          <button className="text-xs text-[#E05A4E] hover:underline font-medium">Export to Excel</button>
        </div>
      </div>
    </div>
  );
}

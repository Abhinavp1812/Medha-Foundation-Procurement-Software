// ─── Mock Vendor Data ─────────────────────────────────────────────────────────
const VENDORS = [
  {
    name: "Dell India Pvt. Ltd.",
    category: "IT & Infrastructure",
    contact: "support@dell.com · 1800-209-3355",
    rating: 5,
    verified: true,
    activeRfqs: 2,
    totalOrders: 14,
    status: "Active",
    gst: "29AABCD1234A1Z5",
  },
  {
    name: "Featherlite Furniture",
    category: "Office Supplies",
    contact: "sales@featherlite.in · 080-4567-8900",
    rating: 4,
    verified: true,
    activeRfqs: 1,
    totalOrders: 8,
    status: "Active",
    gst: "29AABCE5678B2Z3",
  },
  {
    name: "Epson India Pvt. Ltd.",
    category: "Training & Events",
    contact: "enquiry@epson.co.in · 1800-102-7766",
    rating: 4,
    verified: true,
    activeRfqs: 0,
    totalOrders: 5,
    status: "Active",
    gst: "07AABCF9012C3Z1",
  },
  {
    name: "Survey Instruments India",
    category: "Field Operations",
    contact: "info@surveyindia.com · 044-2812-5678",
    rating: 3,
    verified: true,
    activeRfqs: 3,
    totalOrders: 11,
    status: "Active",
    gst: "33AABCG3456D4Z9",
  },
  {
    name: "Navneet Publications Ltd.",
    category: "Office Supplies",
    contact: "trade@navneet.com · 022-6662-6565",
    rating: 4,
    verified: true,
    activeRfqs: 1,
    totalOrders: 22,
    status: "Active",
    gst: "27AABCH7890E5Z7",
  },
  {
    name: "TechServe Solutions",
    category: "IT & Infrastructure",
    contact: "sales@techserve.in · 080-3344-5566",
    rating: 3,
    verified: false,
    activeRfqs: 1,
    totalOrders: 3,
    status: "Under Review",
    gst: "29AABCI2345F6Z5",
  },
  {
    name: "Camlin Ltd.",
    category: "Training & Events",
    contact: "corporate@camlin.com · 022-4040-4040",
    rating: 4,
    verified: true,
    activeRfqs: 0,
    totalOrders: 7,
    status: "Active",
    gst: "27AABCJ6789G7Z3",
  },
  {
    name: "Horizon Travels",
    category: "Travel & Logistics",
    contact: "bookings@horizontravels.in · 011-2345-6789",
    rating: 2,
    verified: false,
    activeRfqs: 0,
    totalOrders: 2,
    status: "Inactive",
    gst: "07AABCK1234H8Z1",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "IT & Infrastructure": "bg-blue-50 text-blue-700",
  "Office Supplies":     "bg-gray-100 text-gray-600",
  "Training & Events":   "bg-purple-50 text-purple-700",
  "Field Operations":    "bg-green-50 text-green-700",
  "Travel & Logistics":  "bg-amber-50 text-amber-700",
};

const STATUS_COLORS: Record<string, string> = {
  Active:          "bg-green-50 text-green-700",
  "Under Review":  "bg-amber-50 text-amber-700",
  Inactive:        "bg-gray-100 text-gray-500",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={i <= rating ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function VendorsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Approved vendor panel — Quotation Compliance & A&IC verified</p>
        </div>
        <button className="flex items-center gap-2 bg-[#E05A4E] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Onboard Vendor
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Vendors",    value: VENDORS.length,                                      color: "#E05A4E", bg: "#FEF2F1" },
          { label: "Active",           value: VENDORS.filter(v => v.status === "Active").length,    color: "#22C55E", bg: "#F0FDF4" },
          { label: "GST Verified",     value: VENDORS.filter(v => v.verified).length,               color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Active RFQs",      value: VENDORS.reduce((s, v) => s + v.activeRfqs, 0),        color: "#F59E0B", bg: "#FFFBEB" },
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
              placeholder="Search vendors…"
              readOnly
            />
          </div>
          <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none">
            <option>All Categories</option>
            <option>IT & Infrastructure</option>
            <option>Office Supplies</option>
            <option>Training & Events</option>
            <option>Field Operations</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Vendor Name", "Category", "Contact", "Rating", "GST Verified", "Active RFQs", "Total Orders", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {VENDORS.map((v) => (
                <tr key={v.name} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-gray-500">{v.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{v.name}</p>
                        <p className="text-[10px] font-mono text-gray-400">{v.gst}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[v.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {v.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[200px]">{v.contact}</td>
                  <td className="px-4 py-3.5">
                    <StarRating rating={v.rating} />
                  </td>
                  <td className="px-4 py-3.5">
                    {v.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-700 px-2.5 py-0.5 text-xs font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2.5 py-0.5 text-xs font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-center font-semibold text-gray-700">
                    {v.activeRfqs > 0 ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FEF2F1] text-[#E05A4E] text-xs font-bold">
                        {v.activeRfqs}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 font-medium">{v.totalOrders}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[v.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {VENDORS.length} vendors · Min. 3 quotes required for orders above ₹50,001
          </p>
          <button className="text-xs text-[#E05A4E] hover:underline font-medium">Export Vendor List</button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const DEPARTMENTS = [
  "IT & Infrastructure",
  "Administration",
  "Training & Events",
  "Field Operations",
  "Travel & Logistics",
  "Finance",
  "HR & Payroll",
];

const BUDGET_HEADS = [
  "IT-CAPEX-2526",
  "ADMIN-OPEX-2526",
  "TRAINING-2526",
  "FIELD-OPS-2526",
  "TRAVEL-2526",
  "FINANCE-2526",
  "HR-2526",
];

const UNITS = ["Nos", "Kg", "Litre", "Ream", "Box", "Kit", "Set", "Metre", "Hour", "Ticket"];

function getQuoteRule(amount: number): { label: string; color: string; description: string } {
  if (amount <= 20000) {
    return {
      label: "Zero Quote (Auto-processed)",
      color: "#22C55E",
      description: "Requests up to ₹20,000 are auto-processed without requiring vendor quotations.",
    };
  } else if (amount <= 50000) {
    return {
      label: "Minimum 2 Quotes Required",
      color: "#F59E0B",
      description: "Requests between ₹20,001–₹50,000 require a minimum of 2 vendor quotations for comparison.",
    };
  } else {
    return {
      label: "Minimum 3 Quotes Required",
      color: "#E05A4E",
      description: "Requests above ₹50,001 require a minimum of 3 vendor quotations and A&IC review.",
    };
  }
}

function getApprovalTier(amount: number): string {
  if (amount <= 5000) return "Tier 1 — Program/Domain Manager (Single Approval)";
  if (amount <= 20000) return "Tier 2 — Regional/State Lead (Single Approval)";
  if (amount <= 50000) return "Tier 3 — Department Head (Email Concurrence)";
  if (amount <= 500000) return "Tier 4 — PC Core Group / 3 Members (Committee Minutes)";
  if (amount <= 2000000) return "Tier 5 — PAF Heads Committee (Unanimous Concurrence)";
  return "Tier 6 — Board of Directors (Board Resolution)";
}

export default function PurchaseRequestPage() {
  const [qty, setQty] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  const totalValue = (parseFloat(qty) || 0) * (parseFloat(unitPrice) || 0);
  const quoteRule = getQuoteRule(totalValue);
  const approvalTier = getApprovalTier(totalValue);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">New Purchase Request</h1>
          <p className="text-xs text-gray-400 mt-0.5">Step 1 — Need Analysis &amp; Department Submission</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-1 font-mono">PR-2526-011 (draft)</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* ── Main Form ──────────────────────────────────────────────────── */}
        <div className="col-span-2 space-y-5">

          {/* Basic details */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">Request Details</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Department <span className="text-[#E05A4E]">*</span>
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors bg-white">
                  <option value="">Select department…</option>
                  {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              {/* Budget Head */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Budget Head <span className="text-[#E05A4E]">*</span>
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors bg-white">
                  <option value="">Select budget head…</option>
                  {BUDGET_HEADS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>

              {/* Item Name */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Item Name / Description <span className="text-[#E05A4E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Laptop – Dell Inspiron 15, 16GB RAM, 512GB SSD"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors placeholder-gray-400"
                />
              </div>

              {/* Item Code */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Item Code
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. IT-001"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors placeholder-gray-400 font-mono"
                />
              </div>

              {/* Required By */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Required By <span className="text-[#E05A4E]">*</span>
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Quantity & Pricing */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">Quantity &amp; Pricing</h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Quantity <span className="text-[#E05A4E]">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Unit <span className="text-[#E05A4E]">*</span>
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors bg-white">
                  <option value="">Select…</option>
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>

              {/* Est. Unit Price */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Est. Unit Price (₹) <span className="text-[#E05A4E]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Total Value */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Estimated Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  ₹{totalValue > 0 ? totalValue.toLocaleString("en-IN") : "0"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Auto-calculated</p>
                <p className="text-xs text-gray-400 mt-0.5">Qty × Unit Price</p>
              </div>
            </div>
          </div>

          {/* Justification */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">Justification &amp; Attachments</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Purpose / Justification <span className="text-[#E05A4E]">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the business need, purpose of procurement, and how this aligns with the programme objectives…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#E05A4E] transition-colors placeholder-gray-400 resize-none"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Supporting Documents</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-400">Drag &amp; drop files or <span className="text-[#E05A4E] font-medium">browse</span></p>
                  <p className="text-xs text-gray-300 mt-1">PDF, XLSX, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <div className="flex items-center gap-3">
              <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="bg-[#E05A4E] text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#c94b40] transition-colors shadow-sm">
                Submit Request →
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ──────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Quotation compliance rule */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quotation Compliance</h3>
            {totalValue > 0 ? (
              <div>
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0" style={{ background: quoteRule.color }} />
                  <p className="text-sm font-semibold text-gray-800">{quoteRule.label}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{quoteRule.description}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400">Est. total value</p>
                  <p className="text-lg font-bold text-gray-900">₹{totalValue.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {[
                  { range: "≤ ₹20,000", label: "Zero Quote (Auto)", color: "#22C55E" },
                  { range: "₹20,001–₹50,000", label: "Min. 2 Quotes", color: "#F59E0B" },
                  { range: "> ₹50,001", label: "Min. 3 Quotes", color: "#E05A4E" },
                ].map((r) => (
                  <div key={r.range} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                    <div>
                      <p className="text-xs font-medium text-gray-700">{r.label}</p>
                      <p className="text-[10px] text-gray-400">{r.range}</p>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-gray-400 mt-2">Enter amount to see applicable rule</p>
              </div>
            )}
          </div>

          {/* Approval tier */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Approval Routing</h3>
            {totalValue > 0 ? (
              <div>
                <p className="text-sm font-medium text-gray-800 leading-snug">{approvalTier}</p>
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-500">Auto-routed on submission. Notifications sent via email and dashboard.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Enter the estimated amount to see which approver this will be routed to.</p>
            )}
          </div>

          {/* Process steps */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">What Happens Next</h3>
            <ol className="space-y-3">
              {[
                "PR submitted & auto-numbered",
                "Line Manager + Dept Head notified",
                "Budget validated (Finance if > ₹50k)",
                "Quotes sourced per compliance rules",
                "A&IC review & L1 comparison",
                "PO issued post-approval",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 h-4 w-4 rounded-full bg-[#FEF2F1] text-[#E05A4E] text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

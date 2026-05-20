"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";

// ─── Tiny icon helper ─────────────────────────────────────
function NavIcon({ path }: { path: string }) {
  return (
    <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {path.split("|").map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── Nav definitions ──────────────────────────────────────
type NavLeaf  = { label: string; href: string; iconPath: string };
type NavGroup = { label: string; iconPath: string; children: { label: string; href: string }[] };
type NavItem  = NavLeaf | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const P = {
  home:     "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z|M9 21V12h6v9",
  clip:     "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  check:    "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  package:  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  bag:      "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  card:     "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  wallet:   "M3 10h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10zm0 0V6a2 2 0 012-2h14a2 2 0 012 2v4M16 14h.01",
  chart:    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
};

const ADMIN_NAV: NavItem[] = [
  { label: "Home",         href: "/admin",              iconPath: P.home     },
  { label: "My Requests",  href: "/admin/requests",     iconPath: P.clip     },
  { label: "Approvals",    href: "/admin/approvals",    iconPath: P.check    },
  { label: "Items",        href: "/admin/items",        iconPath: P.package  },
  { label: "Vendors",      href: "/admin/vendors",      iconPath: P.building },
  {
    label: "Procurement", iconPath: P.bag,
    children: [
      { label: "Purchase Request",  href: "/admin/purchase-request" },
      { label: "Request for Quotes", href: "/admin/new"             },
      { label: "Purchase Orders",   href: "/admin/purchase-orders"  },
    ],
  },
  { label: "Payables",   href: "/admin/payables",   iconPath: P.card   },
  { label: "Budgets",    href: "/admin/budgets",    iconPath: P.wallet },
  { label: "Analytics",  href: "/admin/analytics",  iconPath: P.chart  },
];

const VENDOR_NAV: NavItem[] = [
  { label: "Home",        href: "/vendor",         iconPath: P.home  },
  { label: "Open RFQs",   href: "/vendor",         iconPath: P.clip  },
  { label: "My Quotes",   href: "/vendor/quotes",  iconPath: P.check },
];

// ─── Shell ────────────────────────────────────────────────
export function DashboardShell({
  role,
  userName,
  companyName = "Medha Skilling Foundation",
  children,
}: {
  role: "ADMIN" | "VENDOR";
  userName: string;
  companyName?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>("Procurement");
  const nav = role === "ADMIN" ? ADMIN_NAV : VENDOR_NAV;
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="h-screen bg-[#F5F6F8] flex overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">

        {/* Logo */}
        <div className="h-14 px-4 flex items-center border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#E05A4E] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold tracking-tight">MP</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">Medha</p>
              <p className="text-[10px] text-gray-400 -mt-0.5">Procurement</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {nav.map((item) => {
            if (isGroup(item)) {
              const open = expanded === item.label;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setExpanded(open ? null : item.label)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <span className="text-gray-400"><NavIcon path={item.iconPath} /></span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <svg className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open && (
                    <div className="ml-[30px] mt-0.5 space-y-0.5">
                      {item.children.map((child) => {
                        const active = pathname === child.href;
                        return (
                          <Link key={child.href} href={child.href}
                            className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              active
                                ? "bg-red-50 text-[#E05A4E] font-medium"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`}>
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-red-50 text-[#E05A4E] font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}>
                <span className={active ? "text-[#E05A4E]" : "text-gray-400"}>
                  <NavIcon path={item.iconPath} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="h-8 w-8 rounded-full bg-[#E05A4E] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-[11px] text-gray-400">{companyName}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* ── Right: topbar + main ─────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1">
            <div className="relative max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search..."
                className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E05A4E]/20 focus:border-[#E05A4E]" />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="h-8 w-8 rounded-lg bg-[#E05A4E] text-white flex items-center justify-center hover:bg-[#D04A3C] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="relative h-8 w-8 rounded-lg border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#E05A4E] text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E05A4E] to-[#B03A2E] text-white flex items-center justify-center text-sm font-semibold">
              {initial}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

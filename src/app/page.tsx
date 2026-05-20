import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-display text-lg leading-none">M</span>
          </div>
          <span className="font-display text-xl font-medium tracking-tight">
            Medha <span className="text-[#e94e3c]">Procure</span>
          </span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/signin"
            className="px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full bg-black text-white hover:bg-black/85 transition-colors"
          >
            Become a vendor
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 max-w-6xl mx-auto">
        <p className="text-[#e94e3c] text-sm font-medium tracking-wide uppercase mb-5">
          Procurement, made transparent
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight max-w-3xl text-balance">
          Buy better for the students we serve.
        </h1>
        <p className="mt-6 text-lg text-black/60 max-w-xl leading-relaxed">
          Post a requirement once. Let vetted vendors compete on price and
          delivery. Compare every quotation side by side and award with
          confidence — so more of every rupee reaches a young person&apos;s
          future.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-full bg-[#e94e3c] text-white font-medium hover:bg-[#d8412f] transition-colors"
          >
            Register as a vendor
          </Link>
          <Link
            href="/signin"
            className="px-6 py-3 rounded-full border border-black/15 font-medium hover:bg-black/5 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Two paths */}
      <section className="px-6 md:px-12 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Admin */}
          <div className="rounded-2xl border border-black/10 p-8 hover:border-black/25 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center mb-5">
              <span className="text-white text-sm font-medium">Aa</span>
            </div>
            <h2 className="font-display text-2xl font-medium mb-2">
              For the Medha team
            </h2>
            <p className="text-black/55 leading-relaxed mb-5">
              Launch a buying campaign — say 100 laptops — set your deadline and
              budget, then watch quotations arrive. Compare vendors in one table
              and award the winning bid.
            </p>
            <ul className="space-y-2 text-sm text-black/70 mb-7">
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Post requirements &amp;
                set deadlines
              </li>
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Compare quotations side
                by side
              </li>
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Award the best vendor in
                one click
              </li>
            </ul>
            <Link
              href="/signin"
              className="inline-block text-sm font-medium underline underline-offset-4 hover:text-[#e94e3c]"
            >
              Admin sign in
            </Link>
          </div>

          {/* Vendor */}
          <div className="rounded-2xl border border-black/10 p-8 bg-[#0a0a0a] text-white hover:border-black/40 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-[#e94e3c] flex items-center justify-center mb-5">
              <span className="text-white text-sm font-medium">Vv</span>
            </div>
            <h2 className="font-display text-2xl font-medium mb-2">
              For vendors
            </h2>
            <p className="text-white/55 leading-relaxed mb-5">
              Register your business, browse open requirements from Medha, and
              submit your best quotation. Track where your bids stand in real
              time.
            </p>
            <ul className="space-y-2 text-sm text-white/75 mb-7">
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Sign up free in a minute
              </li>
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Browse open
                requirements
              </li>
              <li className="flex gap-2">
                <span className="text-[#e94e3c]">→</span> Submit &amp; track your
                quotations
              </li>
            </ul>
            <Link
              href="/signup"
              className="inline-block text-sm font-medium text-[#e94e3c] underline underline-offset-4 hover:text-white"
            >
              Create a vendor account
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-black/5 text-sm text-black/40 max-w-6xl mx-auto">
        Built for Medha Foundation — helping young people start rewarding
        careers.
      </footer>
    </main>
  );
}

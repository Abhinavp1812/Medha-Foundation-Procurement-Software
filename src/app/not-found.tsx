import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a] flex flex-col">
      <header className="px-6 py-5 md:px-12 border-b border-black/5">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="h-8 w-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-display text-lg leading-none">M</span>
          </div>
          <span className="font-display text-xl font-medium tracking-tight">
            Medha <span className="text-[#e94e3c]">Procure</span>
          </span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-[#e94e3c] text-sm font-medium tracking-wide uppercase mb-4">
            Coming soon
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight mb-4">
            This page is on its way.
          </h1>
          <p className="text-black/55 leading-relaxed mb-8">
            This section will be available once the requirements are confirmed.
            Check back soon.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-black/85 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

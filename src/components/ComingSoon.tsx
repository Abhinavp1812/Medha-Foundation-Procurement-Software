export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center max-w-sm">
        <p className="text-[#E05A4E] text-xs font-semibold tracking-widest uppercase mb-3">
          Coming soon
        </p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          This section will be available once the requirements are confirmed.
        </p>
      </div>
    </div>
  );
}

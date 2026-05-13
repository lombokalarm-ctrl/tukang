export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />
        Memuat halaman...
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-8 w-64 rounded bg-zinc-200" />
        <div className="h-4 w-96 rounded bg-zinc-200" />
      </div>

      {/* Filters */}
      <div className="h-20 rounded-2xl bg-zinc-200" />

      {/* Column Headers */}
      <div className="rounded-2xl bg-zinc-200 px-5 py-4">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 h-4 rounded bg-zinc-300" />
          <div className="h-4 rounded bg-zinc-300" />
          <div className="h-4 rounded bg-zinc-300" />
          <div className="h-4 rounded bg-zinc-300" />
          <div className="h-4 rounded bg-zinc-300 justify-self-end w-16" />
        </div>
      </div>

      {/* Project Rows */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="grid grid-cols-6 items-center gap-4">
              <div className="col-span-2 h-5 rounded bg-zinc-200" />
              <div className="h-6 w-24 rounded-full bg-zinc-200" />
              <div className="h-4 rounded bg-zinc-200" />
              <div>
                <div className="h-2 w-full rounded bg-zinc-200" />
                <div className="mt-2 h-3 w-12 rounded bg-zinc-200" />
              </div>
              <div className="h-5 w-20 rounded bg-zinc-200 justify-self-end" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <div className="h-10 w-24 rounded-full bg-zinc-200" />
        <div className="h-10 w-20 rounded bg-zinc-200" />
        <div className="h-10 w-24 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

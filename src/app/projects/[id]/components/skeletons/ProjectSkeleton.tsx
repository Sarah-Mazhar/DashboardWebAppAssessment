export function ProjectSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-1/3 rounded bg-zinc-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-200" />
        ))}
      </div>
    </div>
  );
}

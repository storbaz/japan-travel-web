export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
      <div className="h-5 skeleton-pulse rounded w-1/3 mb-3" />
      <div className="h-4 skeleton-pulse rounded w-2/3 mb-2" />
      <div className="h-4 skeleton-pulse rounded w-1/2" />
    </div>
  );
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonLine({ width = "100%" }: { width?: string }) {
  return <div className="h-4 skeleton-pulse rounded" style={{ width }} />;
}

export function SkeletonImage() {
  return <div className="w-full aspect-video skeleton-pulse rounded-xl" />;
}

import { SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-muted/30 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="rounded-xl border bg-card">
        <SkeletonTable rows={6} />
      </div>
    </div>
  );
}

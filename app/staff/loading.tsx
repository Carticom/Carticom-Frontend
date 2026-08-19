import { SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function StaffLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-1">
        <div className="h-6 w-40 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-4 w-56 bg-muted/30 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="rounded-2xl border bg-card">
        <SkeletonTable rows={6} />
      </div>
    </div>
  );
}

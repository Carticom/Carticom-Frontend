export default function StorefrontLoading() {
  return (
    <div className="space-y-6 py-4">
      <div className="h-8 w-32 bg-muted/50 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card overflow-hidden">
            <div className="aspect-square bg-muted/30 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-3 w-1/2 bg-muted/30 rounded-lg animate-pulse" />
              <div className="h-5 w-20 bg-muted/50 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

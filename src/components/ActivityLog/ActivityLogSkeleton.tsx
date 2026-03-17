const ActivityLogSkeleton = () => {
  return (
    <div className="px-4 py-3.5 flex items-start gap-4 border border-border/60 rounded-xl animate-pulse">
      <div className="mt-0.5 w-4 h-4 rounded bg-muted shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3.5 bg-muted rounded w-2/3" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-4 w-16 bg-muted rounded-full" />
            <div className="h-3 w-12 bg-muted rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/4" />
          <div className="h-4 w-14 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ActivityLogSkeleton;

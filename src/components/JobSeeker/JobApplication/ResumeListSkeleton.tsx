import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};
export function ResumeListSkeleton({ count = 3 }: Props) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200"
        >
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />

          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>

          <Skeleton className="w-4 h-4 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

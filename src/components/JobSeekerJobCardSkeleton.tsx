import { Skeleton } from "@/components/ui/skeleton";

const JobSeekerJobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-35" />

            <Skeleton className="h-3 w-25" />
          </div>
        </div>

        <Skeleton className="w-6 h-6 rounded-md" />
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-30" />
        <Skeleton className="h-3 w-35" />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <Skeleton className="h-5 w-17.5 rounded-full" />

        <div className="flex gap-2">
          <Skeleton className="h-8 w-22.5 rounded-md" />
          <Skeleton className="h-8 w-17.5 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default JobSeekerJobCardSkeleton;

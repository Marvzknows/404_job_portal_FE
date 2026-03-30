import { Skeleton } from "@/components/ui/skeleton";

const ApplicationCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-3" />

            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-35" />
            </div>
          </div>
        </div>

        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t border-gray-50">
        <Skeleton className="h-8 w-35 rounded-md" />
      </div>
    </div>
  );
};

export default ApplicationCardSkeleton;

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const ViewJobPostedPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <Skeleton className="h-6 w-30 mb-2" />

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex items-start gap-4">
            <Skeleton className="w-14 h-14 rounded-xl" />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-50" />
                  <Skeleton className="h-4 w-35" />
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-22.5 rounded-full" />
                <Skeleton className="h-6 w-22.5 rounded-full" />
                <Skeleton className="h-6 w-27.5 rounded-full" />
              </div>

              <Skeleton className="h-3 w-37.5 mt-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3 w-[85%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>

      {/* Job Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <Skeleton className="h-4 w-35 mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <Skeleton className="h-4 w-45 mb-4" />

        {/* Company header */}
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-3 w-30" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-[95%] mb-2" />
        <Skeleton className="h-3 w-[90%] mb-4" />

        <Separator className="mb-4" />

        {/* Info rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewJobPostedPageSkeleton;

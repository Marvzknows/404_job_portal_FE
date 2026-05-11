import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const SectionSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="h-4 w-w-35" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  );
};

const InfoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-30" />
        </div>
      ))}
    </div>
  );
};

const ViewJobApplicationSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <Skeleton className="h-4 w-30" /> {/* Back button */}
          <Skeleton className="h-6 w-30" /> {/* Title */}
          <Skeleton className="h-4 w-30" /> {/* Date */}
        </div>
        <Skeleton className="h-6 w-25 rounded-full" /> {/* Status */}
      </div>

      {/* Applicant Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-30" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-3 w-25" />
          </div>
        </div>

        <Separator />

        <InfoGridSkeleton />

        <Separator />

        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
      </div>

      {/* Cover Letter */}
      <SectionSkeleton />

      {/* Job Listing */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-30" />
        </div>

        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-45" />
            <Skeleton className="h-3 w-w-35" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <Separator />

        <InfoGridSkeleton />
      </div>

      {/* Employer */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 2-25" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-w-35" />
            <Skeleton className="h-3 2-25" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>

        <Separator />

        <InfoGridSkeleton />
      </div>
    </div>
  );
};

export default ViewJobApplicationSkeleton;

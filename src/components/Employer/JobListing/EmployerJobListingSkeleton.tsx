import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => (
  <div className="flex flex-col gap-3 p-4 border rounded-xl">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex items-center justify-between mt-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

type EmployerJobListingSkeletonProps = {
  count?: number;
};

const EmployerJobListingSkeleton = ({
  count = 4,
}: EmployerJobListingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default EmployerJobListingSkeleton;

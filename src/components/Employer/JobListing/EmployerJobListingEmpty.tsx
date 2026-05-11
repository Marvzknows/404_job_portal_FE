import { BriefcaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EmployerJobListingEmptyProps = {
  isFiltered?: boolean;
};

const EmployerJobListingEmpty = ({
  isFiltered = false,
}: EmployerJobListingEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
        <BriefcaseIcon className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          {isFiltered ? "No results found" : "No job listings yet"}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {isFiltered
            ? "Try adjusting your search or filters to find what you're looking for."
            : "You haven't posted any jobs yet. Create your first listing to start finding candidates."}
        </p>
      </div>

      {!isFiltered && (
        <Button asChild>
          <Link href="/employer/create-job">Post a Job</Link>
        </Button>
      )}
    </div>
  );
};

export default EmployerJobListingEmpty;

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmployerJobListingHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold">My Job Postings</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          Manage and track your job listings
        </p>
      </div>

      <Button className="bg-violet-500 cursor-pointer hover:bg-violet-700">
        <Plus className="w-5 h-5" />
        Post New Job
      </Button>
    </div>
  );
};

export default EmployerJobListingHeader;

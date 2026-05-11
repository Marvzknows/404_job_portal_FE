import { ArrowLeft } from "lucide-react";
import NavigateButton from "./NavigateButton";

const CreateJobHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold">Post New Job</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          Create a new job post here
        </p>
      </div>

      <NavigateButton
        href="/employer/job-listing"
        label="Back to job listing"
        icon={<ArrowLeft className="w-5 h-5" />}
        className="bg-violet-500 hover:bg-violet-700"
      />
    </div>
  );
};

export default CreateJobHeader;

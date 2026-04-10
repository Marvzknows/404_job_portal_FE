"use client";

import SavedJobCard from "@/components/Employer/JobListing/SavedJobCard";
import PageHeader from "@/components/PageHeader";
import { getErrorMessage } from "@/helpers/helpers";
import { useSavedGetJobList, useUnsaveSaveJobList } from "@/hooks/useJob";
import { toast } from "sonner";

const SavedJobs = () => {
  const { data, isPending, isError, refetch } = useSavedGetJobList();
  const { mutate: unsaveJobAction, isPending: isUnsaving } =
    useUnsaveSaveJobList();

  if (isError) {
    return <div className="border rounded p-2">Error displaying saved job</div>;
  }

  const handleUnsave = (jobListingId: string) => {
    if (!jobListingId) return;
    unsaveJobAction(jobListingId, {
      onSuccess: () => {
        refetch();
        toast.success("Job unsaved");
      },
      onError: (err) =>
        toast.error(getErrorMessage(err, "Removing Saved job failed")),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Saved Job"
        subHeaderTitle="Manage your saved jobs here"
      />

      {isPending ? (
        <p>Loading...</p>
      ) : data?.data.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-white text-center">
          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3">
            <span className="text-violet-400 text-xl">💼</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            No saved jobs yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Jobs you save will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data.data.map((savedJob) => (
            <SavedJobCard
              key={savedJob.id}
              savedJob={savedJob}
              handleUnsave={handleUnsave}
              onApply={(jobListingId) => alert("apply" + jobListingId)}
              isUnsaving={isUnsaving}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;

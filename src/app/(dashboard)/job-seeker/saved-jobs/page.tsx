"use client";

import AppAlertDialog from "@/components/AppAlertDialog";
import SavedJobCard from "@/components/Employer/JobListing/SavedJobCard";
import JobApplicationDialog from "@/components/JobSeeker/JobApplication/JobApplicationDialog";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthProvider";
import { getErrorMessage } from "@/helpers/helpers";
import { useSavedGetJobList, useUnsaveSaveJobList } from "@/hooks/useJob";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";
import { SavedJobListParamsT } from "@/services/job.service";

const SavedJobs = () => {
  const router = useRouter();
  const [params, setParams] = useState<SavedJobListParamsT>({
    search: "",
    date_from: "",
    date_to: "",
    per_page: 6,
    page: 1,
  });

  const { data, isLoading, isError, refetch } = useSavedGetJobList({
    ...params,
  });

  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [createApplicationForm, setCreateApplicationForm] = useState({
    jobTitle: "",
    companyName: "",
  });
  const [jobApplicationId, setJobApplicationId] = useState("");
  const [openNoProfile, setOpenNoProfile] = useState(false);

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

  const handleApply = (
    jobId: string,
    jobTitle: string,
    companyName: string,
  ) => {
    if (!profile) {
      setOpenNoProfile(true);
      return;
    }
    setOpen(true);
    setJobApplicationId(jobId);
    setCreateApplicationForm({
      jobTitle,
      companyName,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Saved Job"
        subHeaderTitle="Manage your saved jobs here"
      />

      {isLoading ? (
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
              isUnsaving={isUnsaving}
              handleApply={handleApply}
            />
          ))}
        </div>
      )}

      {data?.data.meta && !isLoading && (
        <PaginationComponent
          meta={data.data.meta}
          onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
        />
      )}

      <JobApplicationDialog
        open={open}
        onClose={() => setOpen(false)}
        jobTitle={createApplicationForm.jobTitle}
        companyName={createApplicationForm.companyName}
        jobId={jobApplicationId}
      />

      <AppAlertDialog
        open={openNoProfile}
        onOpenChange={setOpenNoProfile}
        title={"Let’s Set Up Your Profile"}
        description={
          "It looks like you don’t have a profile yet. Create one to get started and unlock all features."
        }
        confirmText={"Set Up Profile"}
        onConfirm={() => router.push("/job-seeker/profile")}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default SavedJobs;

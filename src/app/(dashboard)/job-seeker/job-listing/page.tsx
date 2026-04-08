"use client";

import JobSeekerJobCard from "@/components/JobSeekerJobCard";
import JobSeekerSearchFilter from "@/components/JobSeeker/JobListing/JobSeekerSearchFilter";
import PageHeader from "@/components/PageHeader";
import JobApplicationDialog from "@/components/JobSeeker/JobApplication/JobApplicationDialog";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetJobList,
  useSaveJobList,
  useUnsaveSaveJobList,
} from "@/hooks/useJob";
import JobSeekerJobCardSkeleton from "@/components/JobSeekerJobCardSkeleton";
import PaginationComponent from "@/components/PaginationComponent";
import { JobListParamsT } from "@/services/job.service";
import { useAuth } from "@/context/AuthProvider";
import AppAlertDialog from "@/components/AppAlertDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/helpers/helpers";

const JobSeekerJobListingPage = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openNoProfile, setOpenNoProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [jobApplicationId, setJobApplicationId] = useState("");
  const [params, setParams] = useState<JobListParamsT>({
    page: 1,
    per_page: 6,
    search: "",
    status: "",
    job_type: "",
    work_setup: "",
  });
  const [createApplicationForm, setCreateApplicationForm] = useState({
    jobTitle: "",
    companyName: "",
  });

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, refetch } = useGetJobList({
    ...params,
    search: debouncedSearch,
  });

  const { mutate: saveJobAction, isPending: isSaving } = useSaveJobList();
  const { mutate: unsaveJobAction, isPending: isUnsaving } =
    useUnsaveSaveJobList();

  const isPending = isSaving || isUnsaving;

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

  const handleSearchChange = (value: string) => {
    setParams((prev) => ({ ...prev, page: 1 }));
    setSearch(value);
  };

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setParams((prev) => ({
      ...prev,
      [filterName]: filterValue,
      page: 1,
    }));
  };

  const handleSave = (jobId: string, isSaved: boolean) => {
    if (!jobId) return;
    if (isSaved) {
      unsaveJobAction(jobId, {
        onSuccess: () => {
          refetch();
          toast.success("Job unsaved");
        },
        onError: (err) =>
          toast.error(getErrorMessage(err, "Removing Saved job failed")),
      });
    } else {
      saveJobAction(
        { job_id: jobId },
        {
          onSuccess: () => {
            refetch();
            toast.success("Job saved");
          },
          onError: (err) =>
            toast.error(getErrorMessage(err, "Saving job failed")),
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Find Your Dream Job"
        subHeaderTitle="Browse through thousands of opportunities"
      />
      <JobSeekerSearchFilter
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}
        search={search}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <JobSeekerJobCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.data.data.length === 0 ? (
        <p className="text-center text-gray-500">No data found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data.data.map((job) => (
            <JobSeekerJobCard
              key={job.id}
              id={job.id}
              title={job.title}
              jobType={job.job_type}
              location={job.location}
              datePosted={job.created_at}
              maxSalary={job.salary.max}
              minSalary={job.salary.min}
              workSetup={job.work_setup}
              href={`/job-seeker/job-listing/${job.id}`}
              companyName={job.employer.company_name}
              companyLogo={job.employer.logo?.url}
              isApplied={job.is_applied}
              handleApply={handleApply}
              handleSave={handleSave}
              isSaved={job.is_saved}
              isSaving={isPending}
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

export default JobSeekerJobListingPage;

"use client";

import ApplicationCard from "@/components/JobSeeker/JobApplication/ApplicationCard";
import ApplicationCardSkeleton from "@/components/JobSeeker/JobApplication/ApplicationCardSkeleton";
import JobApplicationSearchFilter from "@/components/JobSeeker/JobApplication/JobApplicationSearchFilter";
import PageHeader from "@/components/PageHeader";
import PaginationComponent from "@/components/PaginationComponent";
import useDebounce from "@/hooks/useDebounce";
import { useGetJobApplicationList } from "@/hooks/useJobApplication";
import { JobApplicationListParamsT } from "@/services/jobApplication.service";
import { useState } from "react";

const JobSeekerApplicationPage = () => {
  const [search, setSearch] = useState("");
  const [params, setParams] = useState<JobApplicationListParamsT>({
    page: 1,
    per_page: 8,
    search: "",
    status: "",
    work_setup: "",
    job_type: "",
  });
  const debouncedSearch = useDebounce(search);
  const { data, isLoading } = useGetJobApplicationList({
    ...params,
    search: debouncedSearch,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setParams((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [filterName]: value,
      page: 1,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="My Applications"
        subHeaderTitle="Track your job application and status"
      />

      <JobApplicationSearchFilter
        handleSearchChange={handleSearchChange}
        search={search}
        handleFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <ApplicationCardSkeleton />
            <ApplicationCardSkeleton />
            <ApplicationCardSkeleton />
            <ApplicationCardSkeleton />
          </>
        ) : data?.data?.data.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No applications found.
          </p>
        ) : (
          data?.data.data.map((application) => (
            <ApplicationCard
              key={application.id}
              jobTitle={application.job_listing.title}
              companyName={application.job_listing.location}
              dateApplied={application.date_applied}
              status={application.status}
              href={`/job-seeker/applications/${application.id}`}
            />
          ))
        )}
      </div>

      {data?.data.meta && !isLoading && (
        <PaginationComponent
          meta={data.data.meta}
          onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
};

export default JobSeekerApplicationPage;

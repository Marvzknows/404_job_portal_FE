"use client";

import EmployerJobListingHeader from "@/components/Employer/JobListing/EmployerJobListingHeader";
import EmployerSearchFilter from "@/components/Employer/JobListing/EmployerSearchFilter";
import EmployerJobListingSkeleton from "@/components/Employer/JobListing/EmployerJobListingSkeleton";
import JobCard from "@/components/JobCard";
import PaginationComponent from "@/components/Pagination";
import useDebounce from "@/hooks/useDebounce";
import { useEmployerJobList } from "@/hooks/useJob";
import { EmployerJobListParamsT } from "@/services/job.service";
import { useState } from "react";
import EmployerJobListingEmpty from "@/components/Employer/JobListing/EmployerJobListingEmpty";

const EmployerPageListing = () => {
  const [search, setSearch] = useState("");
  const [tableParams, setTableParams] = useState<EmployerJobListParamsT>({
    page: 1,
    per_page: 2,
    sort_by: "created_at",
    sort_dir: "desc",
    job_type: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useEmployerJobList({
    ...tableParams,
    search: debouncedSearch,
  });

  const jobs = data?.data.data ?? [];
  const hasJobs = jobs.length > 0;
  const isFiltered = !!debouncedSearch;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setTableParams((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setTableParams((prev) => ({
      ...prev,
      [filterName]: value,
      page: 1,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <EmployerJobListingHeader />
      <EmployerSearchFilter
        handleSearchChange={handleSearchChange}
        search={search}
        handleFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <EmployerJobListingSkeleton count={tableParams.per_page} />
      ) : hasJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              jobType={job.job_type}
              location={job.location}
              datePosted={job.created_at}
              totalApplicants={666}
              maxSalary={job.salary.max}
              minSalary={job.salary.min}
              href="/employer/dashboard"
            />
          ))}
        </div>
      ) : (
        <EmployerJobListingEmpty isFiltered={isFiltered} />
      )}

      {data?.data && !isLoading && (
        <PaginationComponent
          meta={data?.data.meta}
          onPageChange={(page) => setTableParams((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
};

export default EmployerPageListing;

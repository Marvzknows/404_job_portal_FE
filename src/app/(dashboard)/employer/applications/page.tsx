"use client";

import EmployerJobApplicationSearchFilter from "@/components/Employer/JobApplication/EmployerJobApplicationSearchFilter";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable/DataTable";
import { EmployerJobApplicationColumn } from "@/components/DataTable/columns/EmployerColumn";
import { useGetJobApplicationList } from "@/hooks/useJobApplication";
import { useState } from "react";
import { JobApplicationListParamsT } from "@/services/jobApplication.service";
import useDebounce from "@/hooks/useDebounce";
import PaginationComponent from "@/components/PaginationComponent";

const EmployerApplicationsPage = () => {
  const [search, setSearch] = useState("");
  const [params, setParams] = useState<JobApplicationListParamsT>({
    page: 1,
    per_page: 8,
    search: "",
    status: "",
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
        headerTitle="Applications"
        subHeaderTitle="Review and manage candidate applications"
      />

      <EmployerJobApplicationSearchFilter
        handleSearchChange={handleSearchChange}
        search={search}
        handleFilterChange={handleFilterChange}
      />

      <DataTable
        data={data?.data.data ?? []}
        loading={isLoading}
        columns={EmployerJobApplicationColumn()}
        caption="A list of your applicants."
        footer={undefined}
      />

      {/* pagination */}
      {data?.data.meta && !isLoading && (
        <PaginationComponent
          meta={data.data.meta}
          onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
};

export default EmployerApplicationsPage;

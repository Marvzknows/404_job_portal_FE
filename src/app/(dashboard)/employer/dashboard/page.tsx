"use client";

import { ActivityLogCard } from "@/components/ActivityLog/ActivityLogCard";
import ActivityLogSkeleton from "@/components/ActivityLog/ActivityLogSkeleton";
import EmployerActivityLogSearchFilter from "@/components/Employer/Dashboard/EmployerActivityLogSearchFilter";
import PageHeader from "@/components/PageHeader";
import PaginationComponent from "@/components/PaginationComponent";
import { useGetEmployerActivityLog } from "@/hooks/useDashboard";
import { EmployerDashboardParamsT } from "@/services/dashboard.service";
import { useState } from "react";

const DashboardPage = () => {
  const [params, setParams] = useState<EmployerDashboardParamsT>({
    page: 1,
    per_page: 5,
    action: "",
    date_from: "",
    date_to: "",
  });
  const { data, isLoading } = useGetEmployerActivityLog({ ...params });

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
        headerTitle="Dashboard Overview"
        subHeaderTitle="Recent Activity Logs"
      />

      <EmployerActivityLogSearchFilter
        handleFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 gap-2.5">
        {isLoading ? (
          <>
            <ActivityLogSkeleton />
            <ActivityLogSkeleton />
            <ActivityLogSkeleton />
          </>
        ) : data?.data?.data?.length ? (
          data.data.data.map((logs) => (
            <ActivityLogCard key={logs.id} log={logs} />
          ))
        ) : (
          <p className="text-center text-gray-500">No activity logs found.</p>
        )}
      </div>

      {data?.data && !isLoading && (
        <PaginationComponent
          meta={data?.data?.meta}
          onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
};

export default DashboardPage;

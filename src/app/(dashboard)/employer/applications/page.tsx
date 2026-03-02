"use client";

import EmployerJobApplicationSearchFilter from "@/components/Employer/JobApplication/EmployerJobApplicationSearchFilter";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable/DataTable";
import {
  ApplicationListInvoices,
  EmployerJobApplicationColumn,
} from "@/components/DataTable/columns/EmployerColumn";

const EmployerApplicationsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Applications"
        subHeaderTitle="Review and manage candidate applications"
      />

      <EmployerJobApplicationSearchFilter />

      <DataTable
        data={ApplicationListInvoices}
        columns={EmployerJobApplicationColumn()}
        caption="A list of your recent invoices."
        footer={undefined}
      />
    </div>
  );
};

export default EmployerApplicationsPage;

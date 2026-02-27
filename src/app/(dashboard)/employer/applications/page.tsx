import EmployerJobApplicationSearchFilter from "@/components/Employer/JobApplication/EmployerJobApplicationSearchFilter";
import PageHeader from "@/components/PageHeader";

const EmployerApplicationsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Applications"
        subHeaderTitle="Review and manage candidate applications"
      />

      <EmployerJobApplicationSearchFilter />
    </div>
  );
};

export default EmployerApplicationsPage;

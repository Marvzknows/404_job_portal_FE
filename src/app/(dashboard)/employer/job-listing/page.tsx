import EmployerJobListingHeader from "@/components/Employer/JobListing/EmployerJobListingHeader";
import EmployerSearchFilter from "@/components/Employer/JobListing/EmployerSearchFilter";

const EmployerPageListing = () => {
  return (
    <div className="flex flex-col gap-4">
      <EmployerJobListingHeader />
      <EmployerSearchFilter />
      {/* Paginated Card list of the job listing data */}
    </div>
  );
};

export default EmployerPageListing;

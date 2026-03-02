import EmployerJobListingHeader from "@/components/Employer/JobListing/EmployerJobListingHeader";
import EmployerSearchFilter from "@/components/Employer/JobListing/EmployerSearchFilter";
import JobCard from "@/components/JobCard";

const EmployerPageListing = () => {
  return (
    <div className="flex flex-col gap-4">
      <EmployerJobListingHeader />
      <EmployerSearchFilter />
      {/* Paginated Card list of the job listing data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <JobCard
          title={"Frontend Developer"}
          jobType={"Full time"}
          location={"Calumpit Bulacan"}
          datePosted={"1/15/2026"}
          totalApplicants={12}
          maxSalary={15000}
          minSalary={50000}
          href="/employer/dashboard"
        />
        <JobCard
          title={"Backend Developer"}
          location={"Pulilan Bulacan"}
          jobType={"Part-time"}
          datePosted={"5/4/2026"}
          totalApplicants={36}
          maxSalary={15000}
          minSalary={50000}
          href="/employer/dashboard"
        />
        <JobCard
          title={"Frontend Developer"}
          jobType={"Full time"}
          location={"Calumpit Bulacan"}
          datePosted={"1/15/2026"}
          totalApplicants={12}
          maxSalary={15000}
          minSalary={50000}
          href="/employer/dashboard"
        />
        <JobCard
          title={"Backend Developer"}
          location={"Pulilan Bulacan"}
          jobType={"Part-time"}
          datePosted={"5/4/2026"}
          totalApplicants={36}
          maxSalary={15000}
          minSalary={50000}
          href="/employer/dashboard"
        />
      </div>
    </div>
  );
};

export default EmployerPageListing;

import JobApplicationSearchFilter from "@/components/JobSeeker/JobApplication/JobApplicationSearchFilter";
import PageHeader from "@/components/PageHeader";

const JobSeekerApplicationPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="My Applications"
        subHeaderTitle="Track your job application and status"
      />

      <JobApplicationSearchFilter />
    </div>
  );
};

export default JobSeekerApplicationPage;

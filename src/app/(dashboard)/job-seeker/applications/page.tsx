import ApplicationCard from "@/components/JobSeeker/JobApplication/ApplicationCard";
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApplicationCard
          jobTitle="Frontend Developer"
          companyName="Accenture"
          dateApplied="January 15, 2026"
          status="rejected"
          href="/applications/1"
        />
        <ApplicationCard
          jobTitle="Backend Developer"
          companyName="Pro-Solutions Technology Co."
          dateApplied="Decenber 25, 2026"
          status="pending"
          href="/applications/1"
        />
      </div>
    </div>
  );
};

export default JobSeekerApplicationPage;

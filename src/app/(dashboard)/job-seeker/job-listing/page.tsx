"use client";

import JobSeekerJobCard from "@/components/JobSeekerJobCard";
import JobSeekerSearchFilter from "@/components/JobSeeker/JobListing/JobSeekerSearchFilter";
import PageHeader from "@/components/PageHeader";
import JobApplicationDialog from "@/components/JobSeeker/JobApplication/JobApplicationDialog";
import { useState } from "react";

const JobSeekerJobListingPage = () => {
  const [open, setOpen] = useState(false);
  const [createApplicationForm, setCreateApplicationForm] = useState({
    jobTitle: "",
    companyName: "",
  });

  const handleApply = (jobTitle: string, companyName: string) => {
    setOpen(true);
    setCreateApplicationForm({
      jobTitle,
      companyName,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Find Your Dream Job"
        subHeaderTitle="Browse through thousands of opportunities"
      />
      <JobSeekerSearchFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <JobSeekerJobCard
          title="Frontend Developer"
          jobType="Full time"
          location="Calumpit Bulacan"
          datePosted="1/15/2026"
          maxSalary={50000}
          minSalary={15000}
          href="/employer/dashboard"
          companyName="Accenture"
          companyLogo="https://api.dicebear.com/7.x/initials/svg?seed=Accenture"
          handleApply={handleApply}
        />

        <JobSeekerJobCard
          title="Backend Developer"
          location="Pulilan Bulacan"
          jobType="Part-time"
          datePosted="5/4/2026"
          maxSalary={50000}
          minSalary={15000}
          href="/employer/dashboard"
          companyName="IBM"
          companyLogo="https://api.dicebear.com/7.x/initials/svg?seed=IBM"
          handleApply={handleApply}
        />

        <JobSeekerJobCard
          title="Frontend Developer"
          jobType="Full time"
          location="Calumpit Bulacan"
          datePosted="1/15/2026"
          maxSalary={50000}
          minSalary={15000}
          href="/employer/dashboard"
          companyName="Big Ben Group"
          companyLogo="https://api.dicebear.com/7.x/initials/svg?seed=Big%20Ben%20Group"
          handleApply={handleApply}
        />

        <JobSeekerJobCard
          title="Backend Developer"
          location="Pulilan Bulacan"
          jobType="Part-time"
          datePosted="5/4/2026"
          maxSalary={50000}
          minSalary={15000}
          href="/employer/dashboard"
          companyName="JP Morgan"
          companyLogo="https://api.dicebear.com/7.x/initials/svg?seed=JP%20Morgan"
          handleApply={handleApply}
        />
      </div>

      <JobApplicationDialog
        open={open}
        onClose={() => setOpen(false)}
        jobTitle={createApplicationForm.jobTitle}
        companyName={createApplicationForm.companyName}
      />
    </div>
  );
};

export default JobSeekerJobListingPage;

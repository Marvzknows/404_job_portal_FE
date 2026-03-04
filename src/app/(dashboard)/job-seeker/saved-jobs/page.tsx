"use client";

import SavedJobCard from "@/components/Employer/JobListing/SavedJobCard";
import PageHeader from "@/components/PageHeader";

export type SavedJob = {
  id: number;
  saved_at: string;
  applied: boolean;
  job_listing: {
    id: number;
    title: string;
    status: "open" | "closed";
    salary_min: string;
    salary_max: string;
    work_setup: string;
    job_type: string;
    employer: {
      company_name: string;
      location: string;
      logo_url: string | null;
    };
  };
};

const SavedJobs = () => {
  const dummySavedJobs: SavedJob[] = [
    {
      id: 1,
      saved_at: "2026-02-28T10:00:00Z",
      applied: false,
      job_listing: {
        id: 101,
        title: "Frontend Developer",
        status: "open",
        salary_min: "40000.00",
        salary_max: "70000.00",
        work_setup: "remote",
        job_type: "full_time",
        employer: {
          company_name: "TechNova Solutions",
          location: "Makati City, Philippines",
          logo_url: null,
        },
      },
    },
    {
      id: 2,
      saved_at: "2026-03-01T08:30:00Z",
      applied: true,
      job_listing: {
        id: 102,
        title: "UI/UX Designer",
        status: "open",
        salary_min: "35000.00",
        salary_max: "55000.00",
        work_setup: "hybrid",
        job_type: "full_time",
        employer: {
          company_name: "Pixel & Co.",
          location: "BGC, Taguig",
          logo_url: null,
        },
      },
    },
    {
      id: 3,
      saved_at: "2026-03-02T14:00:00Z",
      applied: false,
      job_listing: {
        id: 103,
        title: "Backend Engineer",
        status: "closed",
        salary_min: "60000.00",
        salary_max: "90000.00",
        work_setup: "on_site",
        job_type: "contract",
        employer: {
          company_name: "Stackable Inc.",
          location: "Cebu City, Philippines",
          logo_url: null,
        },
      },
    },
    {
      id: 4,
      saved_at: "2026-03-03T09:15:00Z",
      applied: true,
      job_listing: {
        id: 104,
        title: "Full Stack Developer",
        status: "open",
        salary_min: "55000.00",
        salary_max: "85000.00",
        work_setup: "remote",
        job_type: "part_time",
        employer: {
          company_name: "CloudBridge Labs",
          location: "Pasig City, Philippines",
          logo_url: null,
        },
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Saved Job"
        subHeaderTitle="Manage your saved jobs here"
      />

      {dummySavedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-white text-center">
          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3">
            <span className="text-violet-400 text-xl">💼</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            No saved jobs yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Jobs you save will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummySavedJobs.map((savedJob) => (
            <SavedJobCard
              key={savedJob.id}
              savedJob={savedJob}
              onUnsave={(id) => alert("unsave" + id)}
              onApply={(jobListingId) => alert("apply" + jobListingId)}
              onViewDetails={(jobListingId) => alert("view" + jobListingId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;

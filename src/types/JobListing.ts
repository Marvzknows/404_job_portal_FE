import { EmployerProfileDataT } from "./Employer";
import { ApiPaginatedResponse } from "./Pagination";

export type JobListingT = {
  id: string;
  title: string;
  description: string;
  status: string;
  salary: {
    min: number;
    max: number;
  };
  work_setup: string;
  job_type: string;
  employer: EmployerProfileDataT;
  location: string;
  total_applicants: number;
  is_applied: boolean;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
};

export type JobListingListT = ApiPaginatedResponse<JobListingT>;

export const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-red-50 text-red-700 border-red-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

export const WORK_SETUP_STYLES: Record<string, string> = {
  hybrid: "bg-blue-50 text-blue-700 border-blue-200",
  remote: "bg-teal-50 text-teal-700 border-teal-200",
  on_site: "bg-orange-50 text-orange-700 border-orange-200",
};

export const JOB_TYPE_STYLES: Record<string, string> = {
  full_time: "bg-green-50 text-green-700 border-green-200",
  part_time: "bg-yellow-50 text-yellow-700 border-yellow-200",
  contract: "bg-purple-50 text-purple-700 border-purple-200",
  internship: "bg-pink-50 text-pink-700 border-pink-200",
};

export const formattedLabel = {
  // Job status
  open: "Open",
  closed: "Closed",
  draft: "Draft",
  // Work setup
  remote: "Remote",
  on_site: "On-site",
  hybrid: "Hybrid",
  // Job type
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  // Job Application
  pending: "Pending",
  viewed: "Viewed",
  withdrawn: "Withdrawn",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};

export type JobDetailsLogoT = {
  id: number;
  uploaded_by: number;
  file_name: string;
  file_path: string;
  file_size: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export type JobDetailsUserT = {
  id: number;
  avatar_id: number | null;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type JobDetailsEmployerT = {
  id: number;
  user_id: number;
  logo_id: number;
  company_name: string;
  company_description: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  logo: JobDetailsLogoT;
  user: JobDetailsUserT;
};

export type JobDetailT = {
  id: number;
  employer_id: number;
  title: string;
  description: string;
  status: "open" | "closed" | "draft";
  salary_min: string;
  salary_max: string;
  work_setup: "on_site" | "remote" | "hybrid";
  job_type: "full_time" | "part_time" | "contract" | "internship";
  location: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  employer: JobDetailsEmployerT;
};

export type JobDetailResponseT = {
  success: boolean;
  data: JobDetailT;
};

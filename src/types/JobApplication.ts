import { UserT } from "./auth";
import { FilesT } from "./files";
import { JobDetailT } from "./JobListing";
import { ApiPaginatedResponse } from "./Pagination";

export type ApplicationListT = {
  id: string;
  avatarUrl: string;
  applicantName: string;
  email: string;
  jobTitle: string;
  appliedDate: string;
  status: ApplicationStatusT;
};

export type ApplicationStatusT =
  | "pending"
  | "viewed"
  | "withdrawn"
  | "shortlisted"
  | "accepted"
  | "rejected";

export const JOB_APPLICATION_STATUS_STYLESR: Record<
  ApplicationStatusT,
  string
> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  viewed: "bg-blue-50 text-blue-700 border-blue-200",
  withdrawn: "bg-gray-50 text-gray-600 border-gray-200",
  shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export type CompanyLogo = {
  id: number;
  file_name: string;
  file_path: string;
  file_size: string;
  url: string;
  uploaded_by: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
  };
};

export type CompanyProfile = {
  company_name: string;
  company_description: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  logo: FilesT | null;
};

export const initialData: CompanyProfile = {
  company_name: "",
  company_description: "",
  website: "",
  contact_email: "",
  contact_phone: "",
  location: "",
  logo: null,
};

export type JobApplicationListT = {
  id: string;
  job_seeker_id: string;
  job_listing_id: string;
  resume_id: string;
  status: ApplicationStatusT;
  cover_letter: string;
  date_applied: string;
  job_listing: {
    id: string;
    title: string;
  };
  job_seeker: {
    id: string;
    full_name: string;
    email: string;
    current_job_title: string;
    avatar_url: string | null;
  };
};

export type PaginatedJobApplicationListT =
  ApiPaginatedResponse<JobApplicationListT>;

export type ShowJobApplicationT = {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: ApplicationStatusT;
    cover_letter: string;
    applied_at: string;
    resume: FilesT;
    job_seeker: {
      id: string;
      bio: string;
      portfolio: string;
      job_title: string;
      phone: string;
      location: string;
      user: UserT;
    };
    job_listing: JobDetailT;
  };
};

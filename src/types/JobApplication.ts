import { FilesT } from "./files";
import { ApiPaginatedResponse, PaginatedData } from "./Pagination";

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

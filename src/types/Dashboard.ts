import { UserT } from "./auth";
import { JobListingT } from "./JobListing";
import { ApiPaginatedResponse } from "./Pagination";

export type ActivityLogActionsT =
  | ""
  | "JOB_CREATED"
  | "JOB_VIEWED"
  | "JOB_UPDATED"
  | "JOB_DELETED"
  | "JOB_ACCEPTED"
  | "JOB_SHORTLISTEDJOB_REJECTED"
  //Applicants
  | "JOB_APPLIED"
  | "APPLICATION_WITHDRAWN"
  | "PROFILE_UPDATED"
  | "PASSWORD_CHANGED";

export type EmployerActivityLogT = {
  id: string;
  user_id: string;
  job_listing_id: string | null;
  job_application_id: string;
  action: ActivityLogActionsT;
  description: string;
  created_at: string;
  updated_at: string;
  user: UserT;
  job_listing: JobListingT | null;
  job_application: {
    id: string;
    job_seeker_id: string;
    job_listing_id: string;
    job_listing: JobListingT | null;
    resume_id: string;
    status: string;
    cover_letter: string;
    created_at: string;
    updated_at: string;
  };
};

export type PaginatedEmployerActivityLog =
  ApiPaginatedResponse<EmployerActivityLogT>;

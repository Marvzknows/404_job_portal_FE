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
  created_at: string;
  updated_at: string;
};

export type JobListingListT = ApiPaginatedResponse<JobListingT>;

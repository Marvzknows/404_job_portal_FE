import { FilesT } from "./files";

export type JobSeekerProfileT = {
  id: number;
  user_id: number;
  bio: string | null;
  portfolio: string | null;
  current_job_title: string | null;
  resume_id: number | null;
  phone: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  resume: FilesT | null;
};

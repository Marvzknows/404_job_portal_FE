import { EmployerProfileT } from "./Employer";
import { FilesT } from "./files";
import { JobSeekerProfileT } from "./JobSeeker";

export type UserT = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  role: UserRoleT;
  avatar: UserAvatar;
};

export type UploadedByT = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
};
export type UserAvatar = FilesT;

export type UserRoleT = "admin" | "employer" | "job_seeker";

export type MeResponseT = {
  data: {
    user: UserT;
    profile: EmployerProfileT | JobSeekerProfileT | null;
  };
  success: boolean;
};

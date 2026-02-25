import { FilesT } from "./files";

export type UserT = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  role: UserRoleT;
  avatar: UserAvatar;
};

export type UserAvatar = FilesT;

export type UserRoleT = "admin" | "employer" | "job_seeker";

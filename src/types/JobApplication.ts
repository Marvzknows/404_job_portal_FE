import { FilesT } from "./files";

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

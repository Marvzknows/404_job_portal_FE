export type ApplicationListT = {
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
  id: number;
  company_name: string;
  company_description: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  logo: CompanyLogo | null;
};

export const initialData: CompanyProfile = {
  id: 2,
  company_name: "Philadelphia 76ers",
  company_description: "medyo basketbol player",
  website: "https://github.com/",
  contact_email: "ai@gmail.com",
  contact_phone: "09182455347",
  location: "USA America",
  logo: {
    id: 3,
    file_name: "1771393666_699552827c0df.png",
    file_path: "fileUploads/1771393666_699552827c0df.png",
    file_size: "713797",
    url: "http://127.0.0.1:8000/storage/fileUploads/1771393666_699552827c0df.png",
    uploaded_by: {
      id: 3,
      first_name: "Allen",
      last_name: "Iverson",
      full_name: "Allen Iverson",
    },
  },
};

import { FilesT } from "./files";

export type EmployerProfileT = {
  user_id: number;
  company_name: string;
  company_description: string | null;
  logo_id: number | null;
  website: string | null;
  contact_email: string;
  contact_phone: string | null;
  location: string | null;
  logo: FilesT | null;
};

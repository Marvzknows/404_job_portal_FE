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

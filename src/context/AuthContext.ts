import { UserT } from "@/types/auth";
import { EmployerProfileDataT } from "@/types/Employer";
import { JobSeekerProfileT } from "@/types/JobSeeker";
import { createContext } from "react";

type AuthContextType = {
  user: UserT | null;
  profile: EmployerProfileDataT | JobSeekerProfileT | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserT | null>>;
  setProfile: React.Dispatch<
    React.SetStateAction<EmployerProfileDataT | JobSeekerProfileT | null>
  >;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

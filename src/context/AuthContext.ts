import { UserT } from "@/types/auth";
import { createContext } from "react";

type AuthContextType = {
  user: UserT | null;
  setUser: React.Dispatch<React.SetStateAction<UserT | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

"use client";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserT } from "@/types/auth";
import { JobSeekerProfileT } from "@/types/JobSeeker";
import { EmployerProfileT } from "@/types/Employer";

type AuthProviderTypes = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderTypes) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserT | null>(null);
  const [profile, setProfile] = useState<
    EmployerProfileT | JobSeekerProfileT | null
  >(null);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        profile: profile ?? null,
        setUser,
        setProfile,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

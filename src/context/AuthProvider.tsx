"use client";
import { UserT } from "@/types/auth";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderTypes = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderTypes) => {
  const [user, setUser] = useState<UserT | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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

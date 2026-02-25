import { UserT } from "@/types/auth";
import { useEffect, useState } from "react";
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

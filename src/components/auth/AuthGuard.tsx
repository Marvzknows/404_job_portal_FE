"use client";

import { useAuth } from "@/context/AuthProvider";
import { token } from "@/lib/token";
import { UserT } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthGuardProps = {
  allowedRole?: string[];
  children: React.ReactNode;
};

const AuthGuard = ({ allowedRole, children }: AuthGuardProps) => {
  const router = useRouter();
  const storedToken = token.get();
  const storedUser = localStorage.getItem("user");
  const parsedUser: UserT | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!storedToken || !parsedUser) {
      router.replace("/login");
      return;
    }

    if (allowedRole && !allowedRole.includes(parsedUser.role)) {
      router.replace("/login");
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;

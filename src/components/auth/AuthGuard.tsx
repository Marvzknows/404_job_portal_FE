"use client";

import { token } from "@/lib/token";
import { UserT } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthGuardProps = {
  allowedRole?: string[];
  children: React.ReactNode;
};

const AuthGuard = ({ allowedRole, children }: AuthGuardProps) => {
  const router = useRouter();

  useEffect(() => {
    // Run only in browser
    const storedToken = token.get();
    const storedUser = localStorage.getItem("user");
    const parsedUser: UserT | null = storedUser ? JSON.parse(storedUser) : null;

    if (!storedToken || !parsedUser) {
      router.replace("/login");
      return;
    }

    if (allowedRole && !allowedRole.includes(parsedUser.role)) {
      router.replace("/login"); // or "/403"
      return;
    }
  }, [allowedRole, router]);

  return <>{children}</>;
};

export default AuthGuard;

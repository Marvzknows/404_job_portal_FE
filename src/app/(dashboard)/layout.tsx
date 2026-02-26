"use client";

import FullPageError from "@/components/FullPageError";
import FullPageLoader from "@/components/FullPageLoader";
import { useAuth } from "@/context/AuthProvider";
import { useMe } from "@/hooks/useAuth";
import { token } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setProfile, setUser } = useAuth();
  const { data: userData, isFetching, error, refetch } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!token.get()) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (userData) {
      setUser(userData.data.user ?? null);
      setProfile(userData.data.profile ?? null);
    }
  }, [userData, setProfile, setUser]);

  if (isFetching) {
    return <FullPageLoader />;
  }

  if (error) {
    return <FullPageError onRetry={refetch} />;
  }

  return <div>{children}</div>;
}

"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import EmployerNavbar from "@/components/auth/EmployerNavbar";
import EmployerDashboardCard from "@/components/Employer/EmployerDashboardCard";
import { useAuth } from "@/context/AuthProvider";
import { useGetEmployerStats } from "@/hooks/useDashboard";
import { Briefcase, CheckCircle2, Clock, Users } from "lucide-react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading } = useGetEmployerStats();
  const statsCard = [
    {
      label: "Active Jobs",
      value: data?.active_jobs ?? 0,
      icon: Briefcase,
    },
    {
      label: "Total Applicants",
      value: data?.total_applicants ?? 0,
      icon: Users,
    },
    {
      label: "Pending Review",
      value: data?.pending_review ?? 0,
      icon: Clock,
    },
    {
      label: "Shortlisted",
      value: data?.shortlisted ?? 0,
      icon: CheckCircle2,
    },
  ];

  return (
    <AuthGuard allowedRole={["employer"]}>
      <EmployerNavbar
        fullName={user?.full_name ?? "N/A"}
        userAvatarUrl={user?.avatar?.url ?? null}
      />

      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCard.map((card) => (
            <EmployerDashboardCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
              isLoading={isLoading}
            />
          ))}
        </div>
        <hr className="my-3" />
        {children}
      </div>
    </AuthGuard>
  );
}

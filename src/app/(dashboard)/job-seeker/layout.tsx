"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import JobSeekerNavbar from "@/components/auth/JobSeekerNavbar";
import EmployerDashboardCard from "@/components/Employer/EmployerDashboardCard";
import { useAuth } from "@/context/AuthProvider";
import { useGetJobSeekerStats } from "@/hooks/useDashboard";
import { Bookmark, Calendar, Clock, Send } from "lucide-react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading } = useGetJobSeekerStats();
  const statsCard = [
    {
      label: "Total Applications (last 7 days)",
      value: data?.total_applicants ?? 0,
      icon: Send,
    },
    {
      label: "Pending Review",
      value: data?.pending_review ?? 0,
      icon: Clock,
    },
    {
      label: "Shortlisted / Accepted",
      value: data?.shortlisted_accepted ?? 0,
      icon: Calendar,
    },
    {
      label: "Saved Jobs",
      value: data?.saved_jobs ?? 0,
      icon: Bookmark,
    },
  ];
  return (
    <AuthGuard allowedRole={["job_seeker"]}>
      <JobSeekerNavbar
        fullName={user?.full_name ?? "N/A"}
        userAvatarUrl={user?.avatar?.url ?? null}
      />

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

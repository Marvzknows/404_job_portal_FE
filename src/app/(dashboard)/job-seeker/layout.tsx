"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import JobSeekerNavbar from "@/components/auth/JobSeekerNavbar";
import EmployerDashboardCard from "@/components/Employer/EmployerDashboardCard";
import { useAuth } from "@/context/AuthProvider";
import { Bookmark, Calendar, Clock, Send } from "lucide-react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const statsCard = [
    {
      label: "Applications",
      value: "12",
      icon: Send,
    },
    {
      label: "In Progress",
      value: "156",
      icon: Clock,
    },
    {
      label: "Interviews",
      value: "43",
      icon: Calendar,
    },
    {
      label: "Saved Jobs",
      value: "18",
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
            />
          ))}
        </div>
        <hr className="my-3" />
        {children}
      </div>
    </AuthGuard>
  );
}

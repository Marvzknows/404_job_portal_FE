"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import EmployerNavbar from "@/components/auth/EmployerNavbar";
import EmployerDashboardCard from "@/components/Employer/EmployerDashboardCard";
import { useAuth } from "@/context/AuthProvider";
import { Briefcase, CheckCircle2, Clock, Users } from "lucide-react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const statsCard = [
    {
      label: "Active Jobs",
      value: "12",
      icon: Briefcase,
    },
    {
      label: "Total Applicants",
      value: "156",
      icon: Users,
    },
    {
      label: "Pending Review",
      value: "43",
      icon: Clock,
    },
    {
      label: "Shortlisted",
      value: "18",
      icon: CheckCircle2,
    },
  ];

  return (
    <AuthGuard allowedRole={["employer"]}>
      <EmployerNavbar
        fullName={user?.full_name ?? "N/A"}
        userAvatarUrl={user?.avatar.url ?? null}
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
            />
          ))}
        </div>
        <hr className="my-3" />
        {children}
      </div>
    </AuthGuard>
  );
}

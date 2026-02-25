import AuthGuard from "@/components/auth/AuthGuard";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole={["job_seeker"]}>
      <div className="border-2 border-red-500">
        <div className="border border-green-500 p-2 rounded">
          JOB SEEKER STATISTICS CARD
        </div>
        {children}
      </div>
    </AuthGuard>
  );
}

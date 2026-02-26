import AuthGuard from "@/components/auth/AuthGuard";
import EmployerNavbar from "@/components/auth/EmployerNavbar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole={["employer"]}>
      <div className="border-2 border-red-500">
        <EmployerNavbar />
        <div className="border border-green-500 p-2 rounded">
          STATISTICS CARD
        </div>
        {children}
      </div>
    </AuthGuard>
  );
}

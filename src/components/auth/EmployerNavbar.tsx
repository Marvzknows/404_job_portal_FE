import Link from "next/link";

export default function EmployerNavbar() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/employer/dashboard">Dashboard</Link>
      <Link href="/employer/job-listing">My Jobs</Link>
      <Link href="/employer/applications">Applications</Link>
      <Link href="/employer/profile">Company Profile</Link>
    </nav>
  );
}

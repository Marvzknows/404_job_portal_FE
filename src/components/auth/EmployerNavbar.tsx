import { Bell, Building2, LogOut, Settings, User } from "lucide-react";
import NavLink from "../NavLink";

type EmployerNavbarProps = {
  fullName: string;
  userAvatarUrl: string | null;
};
export default function EmployerNavbar({
  fullName,
  userAvatarUrl,
}: EmployerNavbarProps) {
  const navLinks = [
    { href: "/employer/dashboard", label: "Dashboard" },
    { href: "/employer/job-listing", label: "My Jobs" },
    { href: "/employer/applications", label: "Applications" },
    { href: "/employer/profile", label: "Company Profile" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-violet-600" />
            <span className="text-xl font-bold text-gray-900">JobPortal</span>
            <span className="text-sm text-gray-500 ml-2">Employer</span>
          </div>

          {/* navlinks */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {fullName}
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { Bell, Building2, LogOut, Menu, Settings, User, X } from "lucide-react";
import NavLink from "../NavLink";
import Image from "next/image";
import Link from "next/link";

type EmployerNavbarProps = {
  fullName: string;
  userAvatarUrl: string | null;
};

export default function EmployerNavbar({
  fullName,
  userAvatarUrl,
}: EmployerNavbarProps) {
  const [open, setOpen] = useState(false);

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
          <Link href="/employer/dashboard" className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-violet-600" />
            <span className="text-xl font-bold text-gray-900">JobPortal</span>
            <span className="text-sm text-gray-500 ml-2 hidden sm:block">
              Employer
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>

            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-2" />

            <button className="hidden sm:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {userAvatarUrl ? (
                  <Image
                    src={userAvatarUrl}
                    alt={fullName}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {fullName}
              </span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-1" />

            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden lg:block">
                Logout
              </span>
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t">
              <div className="flex items-center gap-3 px-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {userAvatarUrl ? (
                    <Image
                      src={userAvatarUrl}
                      alt={fullName}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{fullName}</p>
                  <p className="text-xs text-gray-500">Employer Account</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

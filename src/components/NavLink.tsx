"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${
          isActive
            ? "bg-violet-100 text-violet-700 shadow-sm"
            : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
        }
      `}
    >
      {label}
    </Link>
  );
};

export default NavLink;

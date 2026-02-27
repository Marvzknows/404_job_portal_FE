"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, User } from "lucide-react";
import { ApplicationListT, ApplicationStatusT } from "@/types/JobApplication";
import { HeaderType } from "../DataTable";
import Image from "next/image";

const statusConfig: Record<
  ApplicationStatusT,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
  },
  viewed: {
    label: "Viewed",
    className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
  },
  shortlisted: {
    label: "Shortlisted",
    className:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
  },
  accepted: {
    label: "Accepted",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
  },
};

const CandidateAvatar = ({ src, name }: { src?: string; name: string }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={40}
        height={40}
        className="rounded-full object-cover border border-gray-200"
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
      <User className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export const EmployerJobApplicationColumn =
  (): HeaderType<ApplicationListT>[] => {
    return [
      {
        key: "candidateName",
        label: "Candidate",
        className: "min-w-[220px]",
        render: (row) => (
          <div className="flex items-center gap-3">
            <CandidateAvatar src={row.avatarUrl} name={row.applicantName} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                {row.applicantName}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">{row.email}</span>
            </div>
          </div>
        ),
      },
      {
        key: "jobPosition",
        label: "Job Position",
        className: "min-w-[180px]",
        render: (row) => (
          <span className="text-sm text-gray-600">{row.jobTitle}</span>
        ),
      },
      {
        key: "appliedDate",
        label: "Applied Date",
        className: "min-w-[120px]",
        render: (row) => (
          <span className="text-sm text-gray-500">{row.appliedDate}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        className: "min-w-[120px]",
        render: (row) => {
          const config = statusConfig[row.status];
          return (
            <Badge
              variant="outline"
              className={`text-xs font-medium px-3 py-1 rounded-full border ${config.className}`}
            >
              {config.label}
            </Badge>
          );
        },
      },
      {
        key: "actions",
        label: "Actions",
        className: "min-w-[180px]",
        render: () => (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-8 px-4 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              View
            </Button>
            <Button
              size="sm"
              className="h-8 px-4 text-xs font-medium bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Shortlist
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                //   onClick={() => callbacks?.onMoreAction?.("view-profile", row)}
                >
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                //   onClick={() => callbacks?.onMoreAction?.("download-cv", row)}
                >
                  Download CV
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  //   onClick={() => callbacks?.onMoreAction?.("reject", row)}
                >
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ];
  };

export const ApplicationListInvoices: ApplicationListT[] = [
  {
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    applicantName: "Juan Dela Cruz",
    email: "juan.delacruz@gmail.com",
    jobTitle: "Frontend Developer",
    appliedDate: "Feb 15, 2026",
    status: "pending",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    applicantName: "Maria Santos",
    email: "maria.santos@gmail.com",
    jobTitle: "UI/UX Designer",
    appliedDate: "Feb 16, 2026",
    status: "viewed",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    applicantName: "James Rodriguez",
    email: "james.rodriguez@gmail.com",
    jobTitle: "React Engineer",
    appliedDate: "Feb 17, 2026",
    status: "shortlisted",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    applicantName: "Angela Lim",
    email: "angela.lim@gmail.com",
    jobTitle: "Frontend Engineer",
    appliedDate: "Feb 18, 2026",
    status: "accepted",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    applicantName: "Michael Tan",
    email: "michael.tan@gmail.com",
    jobTitle: "Junior Web Developer",
    appliedDate: "Feb 19, 2026",
    status: "rejected",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    applicantName: "Sofia Reyes",
    email: "sofia.reyes@gmail.com",
    jobTitle: "Next.js Developer",
    appliedDate: "Feb 20, 2026",
    status: "withdrawn",
  },
];

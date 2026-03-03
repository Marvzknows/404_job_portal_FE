import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Eye,
  UserCheck,
  CheckCircle2,
  XCircle,
  Undo2,
  CalendarDays,
} from "lucide-react";
import { ApplicationStatusT } from "@/types/JobApplication";

type ApplicationCardProps = {
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  dateApplied: string;
  status: ApplicationStatusT;
  href: string;
};

const statusStyles: Record<
  ApplicationStatusT,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-violet-50 text-violet-700 border-violet-200",
    icon: Clock,
  },

  viewed: {
    label: "Viewed",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Eye,
  },

  shortlisted: {
    label: "Shortlisted",
    className: "bg-purple-50 text-purple-700 border-purple-200",
    icon: UserCheck,
  },

  accepted: {
    label: "Accepted",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },

  rejected: {
    label: "Rejected",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },

  withdrawn: {
    label: "Withdrawn",
    className: "bg-gray-100 text-gray-600 border-gray-200",
    icon: Undo2,
  },
};

const ApplicationCard = ({
  jobTitle,
  companyName,
  companyLogo,
  dateApplied,
  status,
  href,
}: ApplicationCardProps) => {
  const logo = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    companyName,
  )}`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          {/* Company Logo */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-gray-50">
            <Image
              src={companyLogo || logo}
              alt={companyName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Job Info */}
          <div>
            <h2 className="text-sm font-semibold text-foreground leading-snug">
              {jobTitle}
            </h2>
            <p className="text-xs text-muted-foreground">{companyName}</p>

            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <CalendarDays className="w-3.5 h-3.5 text-violet-400" />
              Applied on {dateApplied}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <Badge
          variant="outline"
          className={`text-xs font-medium ${statusStyles[status].className}`}
        >
          {statusStyles[status].label}
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4 pt-4 border-t border-gray-50">
        <Link href={href}>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
          >
            View Application
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationCard;

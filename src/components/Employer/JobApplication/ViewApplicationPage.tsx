"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Building2,
  ChevronDown,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import Link from "next/link";
import { formatDate, formatSalary } from "@/helpers/helpers";
import ViewApplicationSkeleton from "./ViewApplicationSkeleton ";
import { useGetJobApplication } from "@/hooks/useJobApplication";
import { formattedLabel, STATUS_STYLES } from "@/types/JobListing";
import {
  ApplicationStatusT,
  JOB_APPLICATION_STATUS_STYLESR,
} from "@/types/JobApplication";

const statusActions: {
  value: ApplicationStatusT;
  label: string;
  icon: React.ElementType;
  class: string;
}[] = [
  // {
  //   value: "pending",
  //   label: "Mark as Pending",
  //   icon: Calendar,
  //   class: "text-yellow-600",
  // },
  {
    value: "viewed",
    label: "Mark as Viewed",
    icon: Eye,
    class: "text-blue-600",
  },
  {
    value: "shortlisted",
    label: "Shortlist",
    icon: Star,
    class: "text-purple-600",
  },
  {
    value: "accepted",
    label: "Accept",
    icon: CheckCircle,
    class: "text-green-600",
  },
  {
    value: "rejected",
    label: "Reject",
    icon: XCircle,
    class: "text-red-600",
  },
  {
    value: "withdrawn",
    label: "Mark as Withdrawn",
    icon: XCircle,
    class: "text-gray-600",
  },
];

const ViewApplicationPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetJobApplication(id);
  const currentStatus = data?.data?.status as ApplicationStatusT | undefined;

  const initials = data?.data?.job_seeker?.user?.full_name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleStatusUpdate = (newStatus: ApplicationStatusT) => {
    alert("Updating status to:" + newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      {isLoading ? (
        <ViewApplicationSkeleton />
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-10">
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 -ml-2 text-muted-foreground hover:text-violet-600"
          >
            <Link href="/employer/applications">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Applications
            </Link>
          </Button>

          {/* Applicant header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-violet-100 ring-offset-2">
                <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {data?.data?.job_seeker?.user?.full_name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {data?.data.job_seeker.job_title}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Badge
                variant="outline"
                className={`${JOB_APPLICATION_STATUS_STYLESR[data?.data.status as keyof typeof JOB_APPLICATION_STATUS_STYLESR]}`}
              >
                {
                  formattedLabel[
                    data?.data.status as keyof typeof formattedLabel
                  ]
                }
              </Badge>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-sm border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800"
                asChild
              >
                <a
                  href={data?.data.resume.url}
                  download={data?.data.resume.file_name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-3.5 w-3.5" />
                  CV
                </a>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-sm border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800"
                  >
                    Update Status
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {statusActions.map(
                    ({ value, label, icon: Icon, class: cls }) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => handleStatusUpdate(value)}
                        disabled={currentStatus === value}
                        className="gap-2 cursor-pointer"
                      >
                        <Icon className={`h-4 w-4 ${cls}`} />
                        <span>{label}</span>
                        {currentStatus === value && (
                          <span className="ml-auto text-[10px] text-muted-foreground">
                            Current
                          </span>
                        )}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Applied {formatDate(data?.data.applied_at ?? "")}
          </p>

          <Separator className="my-6" />

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm sm:grid-cols-4">
            {[
              {
                icon: Mail,
                value: data?.data?.job_seeker?.user?.email,
                href: `mailto:${data?.data?.job_seeker?.user?.email}`,
              },
              { icon: Phone, value: data?.data.job_seeker.phone ?? "NA" },
              { icon: MapPin, value: data?.data.job_seeker.phone ?? "N/A" },
              {
                icon: Globe,
                value: "Portfolio",
                href: data?.data.job_seeker.portfolio ?? "N/A",
              },
            ].map(({ icon: Icon, value, href }, i) => (
              <div key={i} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-violet-600 hover:underline inline-flex items-center gap-1"
                  >
                    {value}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="truncate text-foreground">{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Bio */}
          {data?.data.job_seeker.bio && (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {data?.data.job_seeker.bio}
            </p>
          )}

          <Separator className="my-6" />

          {/* Cover Letter */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-500">
              Cover Letter
            </h2>
            <p className="text-sm leading-relaxed text-foreground">
              {data?.data.cover_letter || (
                <span className="italic text-muted-foreground">
                  No cover letter provided.
                </span>
              )}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Job listing */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-500">
              Applied Position
            </h2>
            <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {data?.data.job_listing.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {data?.data.job_listing.employer.company_name}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {data?.data.job_listing.employer.location}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    STATUS_STYLES[
                      data?.data.job_listing
                        .status as keyof typeof STATUS_STYLES
                    ]
                  }`}
                >
                  {
                    formattedLabel[
                      data?.data.job_listing
                        .status as keyof typeof formattedLabel
                    ]
                  }
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  data?.data.job_listing.work_setup,
                  data?.data.job_listing.job_type,
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                  >
                    {tag}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                  {formatSalary(
                    String(data?.data.job_listing.salary_min),
                    String(data?.data.job_listing.salary_max),
                  )}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
                <a
                  href={`mailto:${data?.data.job_listing.employer.contact_email}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-600"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {data?.data.job_listing.employer.contact_email}
                </a>
                <a
                  href={data?.data.job_listing.employer.website ?? "N/A"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-600"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicationPage;

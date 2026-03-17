"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "@/helpers/helpers";
import { EmployerActivityLogT } from "@/types/Dashboard";
import { formattedLabel } from "@/types/JobListing";

import {
  ArrowUpNarrowWide,
  Briefcase,
  CheckCircle2,
  Eye,
  FileEdit,
  FilePlus,
  FileX2,
  KeyRound,
  LucideIcon,
  MapPin,
  PenSquare,
  Trash2,
  UserCheck,
  UserCog,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const ACTION_CONFIG: Record<
  string,
  {
    label: string;
    icon: LucideIcon;
    color: string;
    dot: string;
  }
> = {
  JOB_ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    color: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  JOB_REJECTED: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    dot: "bg-red-400",
  },
  JOB_UPDATED: {
    label: "Updated",
    icon: PenSquare,
    color: "text-violet-400",
    dot: "bg-violet-400",
  },
  JOB_CREATED: {
    label: "Created",
    icon: FilePlus,
    color: "text-violet-500",
    dot: "bg-violet-500",
  },
  JOB_DELETED: {
    label: "Deleted",
    icon: Trash2,
    color: "text-rose-400",
    dot: "bg-rose-400",
  },
  JOB_VIEWED: {
    label: "Viewed",
    icon: Eye,
    color: "text-slate-400",
    dot: "bg-slate-400",
  },
  JOB_APPLIED: {
    label: "Applied",
    icon: FileEdit,
    color: "text-sky-400",
    dot: "bg-sky-400",
  },
  APPLICATION_WITHDRAWN: {
    label: "Withdrawn",
    icon: FileX2,
    color: "text-orange-400",
    dot: "bg-orange-400",
  },
  JOB_SHORTLISTED: {
    label: "Shortlisted",
    icon: ArrowUpNarrowWide,
    color: "text-green-600",
    dot: "bg-green-600",
  },
  PROFILE_UPDATED: {
    label: "Profile Updated",
    icon: UserCog,
    color: "text-violet-400",
    dot: "bg-violet-400",
  },
  PASSWORD_CHANGED: {
    label: "Password Changed",
    icon: KeyRound,
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  DEFAULT: {
    label: "Activity",
    icon: UserCheck,
    color: "text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

interface ActivityLogCardProps {
  log: EmployerActivityLogT;
}

export function ActivityLogCard({ log }: ActivityLogCardProps) {
  const config = ACTION_CONFIG[log.action] ?? ACTION_CONFIG.DEFAULT;
  const Icon = config.icon;
  const timeAgo = formatDistanceToNow(new Date(log.created_at));

  const navigateTo = log.job_listing_id
    ? `job-listing/${log.job_listing_id}`
    : log.job_application_id
      ? `applications/${log.job_application_id}`
      : null;

  const cardContent = (
    <Card className="group px-4 py-3.5 flex items-start gap-4 border border-border/60 bg-card hover:border-violet-500/40 hover:bg-violet-500/3 transition-all duration-200 shadow-none rounded-xl">
      {/* Icon */}
      <div className={`mt-0.5 shrink-0 ${config.color}`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground leading-snug truncate">
            {log.description}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="secondary"
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border-0 hover:bg-violet-500/10"
            >
              {config.label}
            </Badge>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              {timeAgo}
            </span>
          </div>
        </div>

        {log.job_listing && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Briefcase className="w-3 h-3 text-violet-400/70" />
              <span className="font-medium text-foreground/80">
                {log.job_listing.title}
              </span>
            </div>

            {log.job_listing.location && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="w-2.5 h-2.5" />
                {log.job_listing.location}
              </div>
            )}

            {log.job_listing.work_setup && (
              <Badge
                variant="outline"
                className="text-[11px] font-normal px-1.5 py-0 rounded-full border-border/60"
              >
                {
                  formattedLabel[
                    log.job_listing.work_setup as keyof typeof formattedLabel
                  ]
                }
              </Badge>
            )}

            {log.job_listing.job_type && (
              <Badge
                variant="outline"
                className="text-[11px] font-normal px-1.5 py-0 rounded-full border-border/60"
              >
                {
                  formattedLabel[
                    log.job_listing.job_type as keyof typeof formattedLabel
                  ]
                }
              </Badge>
            )}
          </div>
        )}

        {/* Application detail */}
        {log.job_application && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              {log.job_application?.job_listing?.title}
            </span>
            <span className="text-muted-foreground/40 text-[11px]">·</span>
            <Badge
              variant="outline"
              className="text-[11px] font-normal px-1.5 py-0 rounded-full border-border/60 capitalize"
            >
              {log.job_application.status}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );

  if (!navigateTo) return cardContent;

  return <Link href={navigateTo}>{cardContent}</Link>;
}

"use client";

import {
  MapPin,
  Briefcase,
  Layers,
  Building2,
  BookmarkX,
  ExternalLink,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatLabel, formatSalary, timeAgo } from "@/helpers/helpers";
import { SavedJob } from "@/app/(dashboard)/job-seeker/saved-jobs/page";
import Image from "next/image";

const workSetupColor: Record<string, string> = {
  remote: "bg-sky-50 text-sky-700 border-sky-200",
  hybrid: "bg-amber-50 text-amber-700 border-amber-200",
  on_site: "bg-rose-50 text-rose-700 border-rose-200",
};

type Props = {
  savedJob: SavedJob;
  onUnsave?: (savedId: number) => void;
  onApply?: (jobListingId: number) => void;
  onViewDetails?: (jobListingId: number) => void;
};

const SavedJobCard = ({
  savedJob,
  onUnsave,
  onApply,
  onViewDetails,
}: Props) => {
  const { job_listing, applied, saved_at } = savedJob;
  const { employer } = job_listing;
  const isClosed = job_listing.status === "closed";
  const canApply = !applied && !isClosed;

  return (
    <div
      className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col ${
        isClosed
          ? "border-slate-200 opacity-75"
          : "border-slate-200 hover:border-violet-200"
      }`}
    >
      {/* Status banner */}
      {applied && (
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          You have applied for this job
        </div>
      )}
      {isClosed && !applied && (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-medium">
          <Clock className="w-3.5 h-3.5" />
          This listing is no longer accepting applications
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Logo + title */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
            {employer.logo_url ? (
              <Image
                src={employer.logo_url}
                alt={employer.company_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-5 h-5 text-slate-300" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                  {job_listing.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {employer.company_name}
                </p>
              </div>
              <Badge
                className={`text-xs font-medium border px-2 py-0.5 rounded-full shrink-0 ${
                  isClosed
                    ? "bg-slate-100 text-slate-400 border-slate-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                    isClosed ? "bg-slate-400" : "bg-emerald-500"
                  }`}
                />
                {formatLabel(job_listing.status)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-1 ${
              workSetupColor[job_listing.work_setup] ??
              "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            <Layers className="w-3 h-3" />
            {formatLabel(job_listing.work_setup)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 rounded-full px-2.5 py-1">
            <Briefcase className="w-3 h-3" />
            {formatLabel(job_listing.job_type)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-2.5 py-1">
            <MapPin className="w-3 h-3" />
            {employer.location}
          </span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-sm font-semibold text-emerald-700">
            {formatSalary(job_listing.salary_min, job_listing.salary_max)}
          </span>
          <span className="text-xs text-slate-400">/ month</span>
        </div>

        {/* Saved date */}
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Saved {timeAgo(saved_at)}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider + Actions */}
        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUnsave?.(savedJob.id)}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 gap-1.5 h-8 text-xs px-2"
          >
            <BookmarkX className="w-3.5 h-3.5" />
            Unsave
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(job_listing.id)}
              className="border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 gap-1.5 h-8 text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </Button>

            <Button
              size="sm"
              onClick={() => canApply && onApply?.(job_listing.id)}
              disabled={!canApply}
              className={`gap-1.5 h-8 text-xs ${
                canApply
                  ? "bg-violet-600 hover:bg-violet-700 text-white"
                  : applied
                    ? "bg-violet-100 text-violet-400 border border-violet-200 cursor-not-allowed"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {applied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Applied
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Apply Now
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobCard;

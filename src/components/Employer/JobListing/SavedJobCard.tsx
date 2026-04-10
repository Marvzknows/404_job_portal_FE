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
import Image from "next/image";
import { SavedJobListT } from "@/types/JobListing";
import Link from "next/link";

const workSetupColor: Record<string, string> = {
  remote: "bg-sky-50 text-sky-700 border-sky-200",
  hybrid: "bg-amber-50 text-amber-700 border-amber-200",
  on_site: "bg-rose-50 text-rose-700 border-rose-200",
};

type Props = {
  savedJob: SavedJobListT;
  handleUnsave: (jobListingId: string) => void;
  onApply?: (jobListingId: string) => void;
  isUnsaving?: boolean;
};

const SavedJobCard = ({
  savedJob,
  handleUnsave,
  onApply,
  isUnsaving = false,
}: Props) => {
  const {
    // id: savedJobId,
    job_listing_id,
    created_at,
    job_listing,
    is_applied,
  } = savedJob;

  const isClosed = job_listing?.status == "closed";
  return (
    <div
      className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col ${
        isClosed
          ? "border-slate-200 opacity-75"
          : "border-slate-200 hover:border-violet-200"
      }`}
    >
      {/* Status banner */}
      {is_applied && (
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          You have applied for this job
        </div>
      )}
      {isClosed && !is_applied && (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-medium">
          <Clock className="w-3.5 h-3.5" />
          This listing is no longer accepting applications
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Logo + title */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
            {job_listing?.employer?.logo?.url ? (
              <Image
                src={job_listing?.employer.logo.url}
                alt={job_listing?.employer.company_name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <Building2 className="w-5 h-5 text-slate-300" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                  {job_listing?.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job_listing?.employer?.company_name}
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
                {formatLabel(job_listing?.status ?? "")}
              </Badge>
            </div>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-1 ${
              workSetupColor[job_listing?.work_setup ?? ""] ??
              "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            <Layers className="w-3 h-3" />
            {formatLabel(job_listing?.work_setup ?? "")}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 rounded-full px-2.5 py-1">
            <Briefcase className="w-3 h-3" />
            {formatLabel(job_listing?.job_type ?? "")}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-2.5 py-1">
            <MapPin className="w-3 h-3" />
            {job_listing?.employer?.location ?? "N/A"}
          </span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-sm font-semibold text-emerald-700">
            {formatSalary(
              String(job_listing?.salary?.min),
              String(job_listing?.salary?.max),
            )}
          </span>
          <span className="text-xs text-slate-400"></span>
        </div>

        {/* Saved date */}
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Saved {timeAgo(created_at)}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider + Actions */}
        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUnsave(job_listing_id)}
            disabled={isUnsaving}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 gap-1.5 h-8 text-xs px-2"
          >
            <BookmarkX className="w-3.5 h-3.5" />
            Unsave
          </Button>

          <div className="flex gap-2">
            <Link href={`/job-seeker/job-listing/${job_listing_id}`}>
              <Button
                variant="outline"
                size="sm"
                disabled={isUnsaving}
                className="border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 gap-1.5 h-8 text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Details
              </Button>
            </Link>

            <Button
              size="sm"
              onClick={() => !is_applied && onApply?.(job_listing?.id ?? "")}
              disabled={is_applied || isClosed || isUnsaving}
              className={`gap-1.5 h-8 text-xs ${
                is_applied
                  ? "bg-violet-600 text-white"
                  : isClosed
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
              }`}
            >
              {is_applied ? (
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

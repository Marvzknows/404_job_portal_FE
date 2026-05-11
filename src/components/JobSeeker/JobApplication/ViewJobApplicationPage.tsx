"use client";

import {
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Building2,
  FileText,
  CalendarDays,
  DollarSign,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatDate, formatLabel, formatSalary } from "@/helpers/helpers";
import StatusBadge from "./StatusBadge";
import Section from "./Section";
import InfoRow from "./InfoRow";
import { useGetJobApplication } from "@/hooks/useJobApplication";
import ViewJobApplicationSkeleton from "./ViewJobApplicationSkeleton";

type Props = { id: string };

const ViewJobApplicationPage = ({ id }: Props) => {
  const { data, isLoading } = useGetJobApplication(id);

  const { job_seeker, job_listing } = data?.data || {};
  const { employer } = job_listing || {};

  if (isLoading) {
    return <ViewJobApplicationSkeleton />;
  }

  if (!data || !data.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href="/job-seeker/applications">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-slate-500 hover:text-violet-700 -ml-2 mb-1 h-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Applications
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-slate-900">
            {data?.data.job_listing.title}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            Applied {formatDate(data?.data.applied_at ?? "")}
          </p>
        </div>
        <StatusBadge status={data?.data.status} />
      </div>

      <Section icon={<User className="w-4 h-4" />} title="Applicant">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">
              {job_seeker?.user?.full_name}
            </p>
            <p className="text-sm text-slate-500">{job_seeker?.job_title}</p>
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={job_seeker?.user?.email ?? "N/A"}
            href={`mailto:${job_seeker?.user?.email}`}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={job_seeker?.phone ?? "N/A"}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={job_seeker?.location ?? "N/A"}
          />
          <InfoRow
            icon={<Globe className="w-4 h-4" />}
            label="Portfolio"
            value={job_seeker?.portfolio ?? "N/A"}
            href={job_seeker?.portfolio}
          />
        </div>

        {job_seeker?.bio && (
          <>
            <Separator className="my-4" />
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Bio</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {job_seeker?.bio}
              </p>
            </div>
          </>
        )}
      </Section>

      <Section icon={<FileText className="w-4 h-4" />} title="Cover Letter">
        {data?.data?.cover_letter ? (
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {data?.data?.cover_letter}
          </p>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No cover letter provided.
          </p>
        )}
      </Section>

      <Section icon={<Briefcase className="w-4 h-4" />} title="Job Listing">
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div>
            <p className="text-base font-semibold text-slate-900">
              {job_listing?.title}
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              {employer?.company_name}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`text-xs shrink-0 ${
              job_listing?.status === "open"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {formatLabel(job_listing?.status ?? "")}
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<DollarSign className="w-4 h-4" />}
            label="Salary Range"
            value={formatSalary(
              job_listing?.salary_min ?? "",
              job_listing?.salary_max ?? "",
            )}
          />
          <InfoRow
            icon={<Layers className="w-4 h-4" />}
            label="Work Setup"
            value={formatLabel(job_listing?.work_setup ?? "")}
          />
          <InfoRow
            icon={<Briefcase className="w-4 h-4" />}
            label="Job Type"
            value={formatLabel(job_listing?.job_type ?? "")}
          />
        </div>
      </Section>

      <Section icon={<Building2 className="w-4 h-4" />} title="Employer">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {employer?.company_name}
            </p>
            <p className="text-xs text-slate-500">{employer?.location}</p>
          </div>
        </div>

        {employer?.company_description && (
          <>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {employer?.company_description}
            </p>
            <Separator className="mb-4" />
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Contact Email"
            value={employer?.contact_email ?? "N/A"}
            href={`mailto:${employer?.contact_email}`}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Contact Phone"
            value={employer?.contact_phone ?? "N/A"}
          />
          <InfoRow
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={employer?.website ?? "N/A"}
            href={
              employer?.website?.startsWith("http")
                ? employer?.website
                : `https://${employer?.website}`
            }
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={employer?.location ?? "N/A"}
          />
        </div>
      </Section>
    </div>
  );
};

export default ViewJobApplicationPage;

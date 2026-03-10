"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatToPesos } from "@/helpers/helpers";
import { useViewJobDetails } from "@/hooks/useJob";
import {
  formattedLabel,
  JobDetailT,
  STATUS_STYLES,
  WORK_SETUP_STYLES,
} from "@/types/JobListing";

import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  PhilippinePeso,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ViewJobDetailsSkeleton from "./ViewJobListing/ViewJobDetailsSkeleton";
import InfoChip from "./ViewJobListing/InfoChip";
import TiptapRenderer from "@/components/TiptapRenderer";

type ViewJobDetailsProps = {
  id: string;
};

const ViewJobDetails = ({ id }: ViewJobDetailsProps) => {
  const { data, isLoading } = useViewJobDetails(id);
  const job: JobDetailT | undefined = data?.data;

  if (isLoading) return <ViewJobDetailsSkeleton />;
  if (!job) return null;

  const { employer } = job;

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="self-start -ml-2 text-muted-foreground hover:text-violet-700"
        asChild
      >
        <Link href="/employer/job-listing">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to listings
        </Link>
      </Button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-foreground">{job.title}</h1>
            <span className="text-sm text-muted-foreground">
              {employer.company_name}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`capitalize ${STATUS_STYLES[job.status] ?? ""}`}
            >
              {formattedLabel[job.status as keyof typeof formattedLabel] ||
                job.status}
            </Badge>
            <Badge
              variant="outline"
              className={`capitalize ${WORK_SETUP_STYLES[job.work_setup] ?? ""}`}
            >
              {formattedLabel[job.work_setup as keyof typeof formattedLabel] ||
                job.work_setup}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <InfoChip icon={MapPin} label={job.location} />
          <InfoChip icon={Briefcase} label={job.job_type} />
          <InfoChip
            icon={PhilippinePeso}
            label={`${formatToPesos(Number(job.salary_min))} – ${formatToPesos(Number(job.salary_max))}`}
          />
          <InfoChip
            icon={Calendar}
            label={`Posted ${formatDate(job.created_at)}`}
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white"
            asChild
          >
            <Link href={`/employer/jobs/${job.id}/edit`}>Edit listing</Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Close listing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Job Description
          </h2>
          <TiptapRenderer json={job.description} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">Company</h2>

          <div className="flex items-center gap-3">
            {employer.logo?.url ? (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                <Image
                  src={employer.logo.url}
                  alt={employer.company_name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-violet-500" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {employer.company_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {employer.location}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {employer.company_description}
          </p>

          <Separator />

          <div className="flex flex-col gap-2.5">
            <a
              href={employer.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-violet-600 hover:underline"
            >
              <Globe className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              {employer.website.replace(/^https?:\/\//, "")}
            </a>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              {employer.contact_email}
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              {employer.contact_phone}
            </span>
          </div>

          <Separator />

          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground font-medium">
              Posted by
            </p>
            <p className="text-sm font-semibold text-foreground">
              {employer.user.first_name} {employer.user.last_name}
            </p>
            <p className="text-xs text-muted-foreground">
              {employer.user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobDetails;

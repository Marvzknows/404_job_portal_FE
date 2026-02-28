import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  ArrowLeft,
  ExternalLink,
  DollarSign,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { formatDate, formatSalary } from "@/helpers/helpers";

const applicationData = {
  id: 3,
  status: "rejected",
  cover_letter:
    "I am excited to apply for this position. I believe my experience and skills make me a strong candidate for the role. I am passionate about building great user experiences and would love to contribute to your team.",
  applied_at: "2026-02-21 11:40:34",
  job_seeker: {
    bio: "Passionate frontend developer with 3+ years of experience building modern web applications.",
    portfolio: "https://my-portfolio-v2-blue.vercel.app/",
    job_title: "Frontend Developer",
    phone: "09182455347",
    location: "Pulilan, Bulacan",
    user: {
      email: "ck@gmail.com",
      full_name: "Clark Kent",
    },
  },
  job_listing: {
    title: "Full Stack Developer",
    status: "open",
    salary_min: "322633.00",
    salary_max: "700000.00",
    work_setup: "Hybrid",
    job_type: "Contract",
    employer: {
      company_name: "TechCorp Inc.",
      location: "Makati, Metro Manila",
      contact_email: "test@gmail.com",
      website: "https://techcorp.com",
    },
  },
};

const statusMap: Record<string, { label: string; class: string }> = {
  rejected: {
    label: "Rejected",
    class: "bg-red-50 text-red-600 border-red-200",
  },
  pending: {
    label: "Pending",
    class: "bg-amber-50 text-amber-600 border-amber-200",
  },
  accepted: {
    label: "Accepted",
    class: "bg-green-50 text-green-600 border-green-200",
  },
  reviewing: {
    label: "Reviewing",
    class: "bg-violet-50 text-violet-600 border-violet-200",
  },
};

const ViewApplicationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = applicationData;
  const status = statusMap[data.status] ?? {
    label: data.status,
    class: "bg-gray-50 text-gray-600 border-gray-200",
  };
  const initials = data.job_seeker.user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-gray-50/60">
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
                {data.job_seeker.user.full_name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {data.job_seeker.job_title}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs font-medium ${status.class}`}
          >
            {status.label}
          </Badge>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          Applied {formatDate(data.applied_at)}
        </p>

        <Separator className="my-6" />

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm sm:grid-cols-4">
          {[
            {
              icon: Mail,
              value: data.job_seeker.user.email,
              href: `mailto:${data.job_seeker.user.email}`,
            },
            { icon: Phone, value: data.job_seeker.phone },
            { icon: MapPin, value: data.job_seeker.location },
            {
              icon: Globe,
              value: "Portfolio",
              href: data.job_seeker.portfolio,
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
        {data.job_seeker.bio && (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {data.job_seeker.bio}
          </p>
        )}

        <Separator className="my-6" />

        {/* Cover Letter */}
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-500">
            Cover Letter
          </h2>
          <p className="text-sm leading-relaxed text-foreground">
            {data.cover_letter || (
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
                  {data.job_listing.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {data.job_listing.employer.company_name}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {data.job_listing.employer.location}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 border-green-200 bg-green-50 text-xs text-green-600"
              >
                {data.job_listing.status}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[data.job_listing.work_setup, data.job_listing.job_type].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                  >
                    {tag}
                  </span>
                ),
              )}
              <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                <DollarSign className="h-3 w-3" />
                {formatSalary(
                  data.job_listing.salary_min,
                  data.job_listing.salary_max,
                )}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
              <a
                href={`mailto:${data.job_listing.employer.contact_email}`}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-600"
              >
                <Mail className="h-3.5 w-3.5" />
                {data.job_listing.employer.contact_email}
              </a>
              <a
                href={data.job_listing.employer.website}
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
    </div>
  );
};

export default ViewApplicationPage;

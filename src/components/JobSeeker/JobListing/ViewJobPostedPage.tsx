"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Briefcase,
  Layers,
  CalendarDays,
  ChevronLeft,
  FileText,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Section from "../JobApplication/Section";
import StatusBadge from "../JobApplication/StatusBadge";
import { formatDate, formatLabel, formatSalary } from "@/helpers/helpers";
import InfoRow from "../JobApplication/InfoRow";
import Image from "next/image";
import { useViewPublicJobDetails } from "@/hooks/useJob";
import NoDataFound from "@/components/NoDataFound";
import ViewJobPostedPageSkeleton from "./ViewJobPostedPageSkeleton";

// TipTap read-only viewer
const JobDescriptionViewer = ({ content }: { content: string }) => {
  let parsed: object | null = null;

  try {
    parsed = content ? JSON.parse(content) : null;
  } catch {
    parsed = null;
  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
    ],
    content: parsed ?? "",
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] px-3 py-2 " +
          "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 " +
          "[&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 " +
          "[&_h1]:text-4xl [&_h1]:mb-2 " +
          "[&_h2]:text-3xl [&_h2]:mb-2 " +
          "[&_h3]:text-2xl [&_h3]:mb-1 " +
          "[&_h4]:text-xl [&_h4]:mb-1",
      },
    },
  });

  return (
    <div className="tiptap-viewer">
      <EditorContent editor={editor} />
    </div>
  );
};

type Props = { id: string };

const ViewJobPostedPage = ({ id }: Props) => {
  const { data, isLoading } = useViewPublicJobDetails(id);
  if (isLoading) {
    return <ViewJobPostedPageSkeleton />;
  }

  if (!data) {
    return <NoDataFound title="No Data found" />;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <Link href="/job-seeker/job-listing">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-slate-500 hover:text-violet-700 -ml-2 mb-1 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Jobs
          </Button>
        </Link>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
              {data.data.employer ? (
                <Image
                  src={data.data.employer.logo.url}
                  alt={data.data.employer.company_name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Building2 className="w-7 h-7 text-slate-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    {data.data.title}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {data.data.employer.company_name}
                  </p>
                </div>
                <StatusBadge status={data.data.status} />
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
                  <Layers className="w-3.5 h-3.5" />
                  {formatLabel(data.data.work_setup)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {formatLabel(data.data.job_type)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                  {formatSalary(data.data.salary_min, data.data.salary_max)}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Posted {formatDate(data.data.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section icon={<FileText className="w-4 h-4" />} title="Job Description">
        <JobDescriptionViewer content={data.data.description} />
      </Section>

      <Section icon={<Briefcase className="w-4 h-4" />} title="Job Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<HandCoins className="w-4 h-4" />}
            label="Salary Range"
            value={formatSalary(data.data.salary_min, data.data.salary_max)}
          />
          <InfoRow
            icon={<Layers className="w-4 h-4" />}
            label="Work Setup"
            value={formatLabel(data.data.work_setup)}
          />
          <InfoRow
            icon={<Briefcase className="w-4 h-4" />}
            label="Job Type"
            value={formatLabel(data.data.job_type)}
          />
          <InfoRow
            icon={<CalendarDays className="w-4 h-4" />}
            label="Date Posted"
            value={formatDate(data.data.created_at)}
          />
        </div>
      </Section>

      <Section
        icon={<Building2 className="w-4 h-4" />}
        title="About the Company"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
            {data.data.employer.logo?.url ? (
              <Image
                src={data.data.employer.logo.url}
                alt={data.data.employer.company_name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Building2 className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {data.data.employer.company_name}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {data.data.employer.location}
            </p>
          </div>
        </div>

        {data.data.employer.company_description && (
          <>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {data.data.employer.company_description}
            </p>
            <Separator className="mb-4" />
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Contact Email"
            value={data.data.employer.contact_email}
            href={`mailto:${data.data.employer.contact_email}`}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Contact Phone"
            value={data.data.employer.contact_phone}
          />
          <InfoRow
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={data.data.employer.website}
            href={
              data.data.employer.website.startsWith("http")
                ? data.data.employer.website
                : `https://${data.data.employer.website}`
            }
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={data.data.employer.location}
          />
        </div>
      </Section>
    </div>
  );
};

export default ViewJobPostedPage;

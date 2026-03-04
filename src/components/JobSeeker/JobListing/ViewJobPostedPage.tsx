"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  DollarSign,
  Briefcase,
  Layers,
  CalendarDays,
  ChevronLeft,
  FileText,
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
const mockJob = {
  id: 3,
  employer_id: 4,
  title: "Frontend Developer",
  description:
    '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"center"},"content":[{"type":"text","text":"AHAHA"}]},{"type":"paragraph","attrs":{"textAlign":"right"},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"bold text"}]},{"type":"paragraph","attrs":{"textAlign":"right"},"content":[{"type":"text","marks":[{"type":"italic"}],"text":"italic text"}]},{"type":"orderedList","attrs":{"start":1,"type":null},"content":[{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"one"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"two"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"three"}]}]}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"center"},"content":[{"type":"text","text":"aaaa"}]}]}]},{"type":"paragraph","attrs":{"textAlign":null}}]}',
  status: "open",
  salary_min: "20000.00",
  salary_max: "40000.00",
  work_setup: "remote",
  job_type: "full_time",
  created_at: "2026-02-16T08:56:56.000000Z",
  updated_at: "2026-02-16T08:56:56.000000Z",
  employer: {
    id: 4,
    company_name: "new company name",
    company_description: "new company company_description",
    website: "new website link",
    contact_email: "test@gmail.com",
    contact_phone: "09121211212",
    location: "new location",
    logo: {
      url: "http://127.0.0.1:8000/storage/fileUploads/1771224355_6992bd235e841.png",
    },
    user: {
      first_name: "Lebron",
      last_name: "James",
      email: "lbj@gmail.com",
    },
  },
};

// TipTap read-only viewer
const JobDescriptionViewer = ({ content }: { content: string }) => {
  let parsed: object | null = null;
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = null;
  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit, // disable built-in heading
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
    ],
    content: content ? JSON.parse(content) : "",
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] px-3 py-2" +
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
    <>
      <div className="tiptap-viewer">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

type Props = { id: string };

const ViewJobPostedPage = ({ id }: Props) => {
  const data = mockJob;
  const { employer } = data;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <Link href="/jobs">
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
            <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
              {employer.logo?.url ? (
                <img
                  src={employer.logo.url}
                  alt={employer.company_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <Building2 className="w-7 h-7 text-slate-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    {data.title}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {employer.company_name}
                  </p>
                </div>
                <StatusBadge status={data.status} />
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
                  <Layers className="w-3.5 h-3.5" />
                  {formatLabel(data.work_setup)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {formatLabel(data.job_type)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {formatSalary(data.salary_min, data.salary_max)}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Posted {formatDate(data.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section icon={<FileText className="w-4 h-4" />} title="Job Description">
        <JobDescriptionViewer content={data.description} />
      </Section>

      <Section icon={<Briefcase className="w-4 h-4" />} title="Job Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<DollarSign className="w-4 h-4" />}
            label="Salary Range"
            value={formatSalary(data.salary_min, data.salary_max)}
          />
          <InfoRow
            icon={<Layers className="w-4 h-4" />}
            label="Work Setup"
            value={formatLabel(data.work_setup)}
          />
          <InfoRow
            icon={<Briefcase className="w-4 h-4" />}
            label="Job Type"
            value={formatLabel(data.job_type)}
          />
          <InfoRow
            icon={<CalendarDays className="w-4 h-4" />}
            label="Date Posted"
            value={formatDate(data.created_at)}
          />
        </div>
      </Section>

      <Section
        icon={<Building2 className="w-4 h-4" />}
        title="About the Company"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
            {employer.logo?.url ? (
              <img
                src={employer.logo.url}
                alt={employer.company_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <Building2 className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {employer.company_name}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {employer.location}
            </p>
          </div>
        </div>

        {employer.company_description && (
          <>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {employer.company_description}
            </p>
            <Separator className="mb-4" />
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Contact Email"
            value={employer.contact_email}
            href={`mailto:${employer.contact_email}`}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Contact Phone"
            value={employer.contact_phone}
          />
          <InfoRow
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={employer.website}
            href={
              employer.website.startsWith("http")
                ? employer.website
                : `https://${employer.website}`
            }
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={employer.location}
          />
        </div>
      </Section>
    </div>
  );
};

export default ViewJobPostedPage;

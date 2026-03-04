"use client";

import { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  X,
  Check,
  Upload,
  Download,
  FileText,
  Trash2,
  User,
  MapPin,
} from "lucide-react";

interface JobSeekerProfile {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  portfolio: string;
  current_job_title: string;
  phone: string;
  location: string;
}

interface ResumeFile {
  name: string;
  size: number;
  uploadedAt: string;
}

const defaultProfile: JobSeekerProfile = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@email.com",
  bio: "Experienced frontend developer with 5+ years of experience in React and modern web technologies.",
  portfolio: "https://myportfolio.dev",
  current_job_title: "Senior Frontend Developer",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const JobSeekerProfilePage = () => {
  const [profile, setProfile] = useState<JobSeekerProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<JobSeekerProfile>(defaultProfile);

  const [resume, setResume] = useState<ResumeFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile edit handlers
  const handleEdit = () => {
    setForm(profile);
    setIsEditing(true);
  };
  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };
  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };
  const field = (key: keyof JobSeekerProfile, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Resume handlers
  const handleFile = (file: File) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      alert("Only PDF and Word documents are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setResume({
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
      setIsUploading(false);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="My Profile"
        subHeaderTitle="Manage your profile and resume"
      />

      <div className="flex flex-col gap-4 max-w-3xl w-full">
        {/* ── Profile Header Card ── */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
              <User className="w-8 h-8 text-violet-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-slate-900">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {profile.current_job_title}
              </p>
              <p className="text-sm text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
                <span className="text-slate-300">·</span>
                {profile.email}
              </p>
              <div className="flex gap-2 mt-3">
                {isEditing ? (
                  <Button
                    size="sm"
                    onClick={handleCancel}
                    className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 text-xs h-8"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Cancel Edit Profile
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleEdit}
                    disabled={isEditing}
                    className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 text-xs h-8"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Profile
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 text-xs h-8"
                >
                  View Public Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Resume</h3>

          {resume && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-violet-200 bg-violet-50 mb-3">
              <div className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {resume.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatFileSize(resume.size)} · Uploaded {resume.uploadedAt}
                </p>
              </div>
              <Badge className="text-xs bg-violet-100 text-violet-700 border-0 hover:bg-violet-100 shrink-0">
                Active
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                onClick={() => setResume(null)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg py-10 px-4 flex flex-col items-center justify-center gap-3
              transition-all duration-150
              ${
                isDragging
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 bg-slate-50/50"
              }
            `}
          >
            {isUploading ? (
              <>
                <div className="w-8 h-8 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                <p className="text-sm text-violet-600 font-medium">
                  Uploading…
                </p>
              </>
            ) : (
              <>
                <FileText className="w-10 h-10 text-slate-300" />
                <p className="text-sm text-slate-500">
                  {resume
                    ? "Replace your resume"
                    : "Upload your resume to apply faster"}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 text-xs h-8"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Resume
                  </Button>
                  {resume && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 gap-1.5 text-xs h-8"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Current
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-5">
            Personal Information
          </h3>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">First Name</Label>
                <Input
                  value={isEditing ? form.first_name : profile.first_name}
                  onChange={(e) => field("first_name", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Last Name</Label>
                <Input
                  value={isEditing ? form.last_name : profile.last_name}
                  onChange={(e) => field("last_name", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Email</Label>
              <Input
                type="email"
                value={isEditing ? form.email : profile.email}
                onChange={(e) => field("email", e.target.value)}
                disabled={!isEditing}
                className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Phone</Label>
              <Input
                type="tel"
                value={isEditing ? form.phone : profile.phone}
                onChange={(e) => field("phone", e.target.value)}
                disabled={!isEditing}
                className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Location</Label>
              <Input
                value={isEditing ? form.location : profile.location}
                onChange={(e) => field("location", e.target.value)}
                disabled={!isEditing}
                className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">
                Current Job Title
              </Label>
              <Input
                value={
                  isEditing ? form.current_job_title : profile.current_job_title
                }
                onChange={(e) => field("current_job_title", e.target.value)}
                disabled={!isEditing}
                className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Portfolio URL</Label>
              <Input
                type="url"
                value={isEditing ? form.portfolio : profile.portfolio}
                onChange={(e) => field("portfolio", e.target.value)}
                disabled={!isEditing}
                className="text-sm disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Bio</Label>
              <Textarea
                value={isEditing ? form.bio : profile.bio}
                onChange={(e) => field("bio", e.target.value)}
                disabled={!isEditing}
                rows={4}
                className="text-sm resize-none disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-default border-slate-200 focus-visible:ring-violet-400"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-6 pt-4 border-t border-slate-100">
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 h-8"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 gap-1.5 h-8"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfilePage;

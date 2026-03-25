"use client";

import { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Check,
  Upload,
  FileText,
  User,
  MapPin,
  Camera,
} from "lucide-react";
import {
  useJobSeekerProfile,
  useUpdateProfileAvatar,
} from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthProvider";
import {
  useDeleteResume,
  useGetUserResumeList,
  useUploadResume,
} from "@/hooks/useResume";
import ResumeCard from "@/components/ResumeCard";
import AppAlertDialog from "@/components/AppAlertDialog";
import { toast } from "sonner";
import { getErrorMessage } from "@/helpers/helpers";
import { FilesT } from "@/types/files";

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

const JobSeekerProfilePage = () => {
  const { profile: jobSeekerProfile } = useAuth();

  // #region API's
  const { data } = useJobSeekerProfile(String(jobSeekerProfile?.id), {
    enabled: jobSeekerProfile?.id != null,
  });

  const {
    data: userResumes,
    isLoading: isLoadingResumes,
    refetch: refetchResumeList,
  } = useGetUserResumeList();

  const { mutate: deleteResume, isPending: isDeletingResume } =
    useDeleteResume();

  const { mutate: uploadAction, isPending: isUploading } = useUploadResume();
  const { mutate: updateAvatarAction, isPending: isUpdatingAvatar } =
    useUpdateProfileAvatar();
  // #endregion

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<JobSeekerProfile>(defaultProfile);
  const [openAppDialog, setOpenAppDialog] = useState(false);
  const [deleteResumeId, setDeleteResumeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const profile: JobSeekerProfile = {
    first_name: data?.data?.user?.first_name ?? defaultProfile.first_name,
    last_name: data?.data?.user?.last_name ?? defaultProfile.last_name,
    email: data?.data?.user?.email ?? defaultProfile.email,
    bio: data?.data?.bio ?? defaultProfile.bio,
    portfolio: data?.data?.portfolio ?? defaultProfile.portfolio,
    current_job_title:
      data?.data?.current_job_title ?? defaultProfile.current_job_title,
    phone: data?.data?.phone ?? defaultProfile.phone,
    location: data?.data?.location ?? defaultProfile.location,
  };

  const avatarUrl = avatarPreview ?? data?.data?.user?.avatar?.url ?? null;

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
    setIsEditing(false);
  };
  const field = (key: keyof JobSeekerProfile, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP, or GIF images are accepted.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB.");
      e.target.value = "";
      return;
    }

    // Show preview immediately before the upload finishes
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    updateAvatarAction(formData, {
      onSuccess: () => {
        toast.success("Profile picture updated successfully");
      },
      onError: (err) => {
        toast.error(getErrorMessage(err, "Failed to update profile picture"));
        setAvatarPreview(null);
      },
    });

    e.target.value = "";
  };

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

    const formData = new FormData();
    formData.append("resume", file);
    uploadAction(formData, {
      onSuccess: () => {
        refetchResumeList();
        toast.success("Resume uploaded successfully");
      },
      onError: (err) =>
        toast.error(getErrorMessage(err, "Uploading resume failed")),
    });
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

  const handleDeleteResume = () => {
    if (!deleteResumeId) return;
    deleteResume(
      { resumeId: deleteResumeId },
      {
        onSuccess: () => {
          refetchResumeList();
          toast.success("File deleted successfully");
        },
        onError: (err) =>
          toast.error(getErrorMessage(err, "Deleting resume failed")),
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="My Profile"
        subHeaderTitle="Manage your profile and resume"
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0 group">
              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={isUpdatingAvatar}
                className="relative w-16 h-16 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
                aria-label="Update profile picture"
                title="Click to update profile picture"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${profile.first_name} ${profile.last_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-violet-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-violet-500" />
                  </div>
                )}

                {/* Hover / uploading overlay */}
                <div
                  className={`
                    absolute inset-0 flex flex-col items-center justify-center gap-0.5
                    bg-black/40 transition-opacity duration-150
                    ${isUpdatingAvatar ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
                >
                  {isUpdatingAvatar ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-4 h-4 text-white" />
                      <span className="text-white text-[10px] font-medium leading-tight">
                        Update
                      </span>
                    </>
                  )}
                </div>
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleAvatarChange}
                className="hidden"
              />
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
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Resume</h3>

          <div className="flex flex-col gap-3 mb-3">
            {isLoadingResumes && (
              <p className="text-sm text-slate-400">Loading resumes...</p>
            )}

            {!isLoadingResumes && userResumes?.data?.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-2">
                No resumes uploaded yet.
              </p>
            )}

            {userResumes?.data?.map((resume: FilesT) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                isDeleting={isDeletingResume}
                onDelete={(id) => {
                  if (!id) return;
                  setOpenAppDialog(true);
                  setDeleteResumeId(id);
                }}
                onDownload={() => {
                  window.open(resume.url, "_blank");
                }}
              />
            ))}
          </div>

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
                  Upload your resume to apply faster
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

      <AppAlertDialog
        open={openAppDialog}
        onOpenChange={setOpenAppDialog}
        title={"Delete Resume"}
        description={
          "Are you sure you want to delete this resume? This action cannot be undone and the file will be permanently removed from your account."
        }
        confirmText={"Delete"}
        confirmVariant="destructive"
        onConfirm={handleDeleteResume}
        onCancel={() => setOpenAppDialog(false)}
      />
    </div>
  );
};

export default JobSeekerProfilePage;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateJobSeekerProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { getErrorMessage } from "@/helpers/helpers";

interface CreateJobSeekerProfilePayload {
  bio: string;
  portfolio: string;
  current_job_title: string;
  phone: string;
  location: string;
}

const defaultValues: CreateJobSeekerProfilePayload = {
  bio: "",
  portfolio: "",
  current_job_title: "",
  phone: "",
  location: "",
};

const CreateProfile = () => {
  const { mutate: createAction, isPending } = useCreateJobSeekerProfile();
  const [form, setForm] =
    useState<CreateJobSeekerProfilePayload>(defaultValues);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const field = (key: keyof CreateJobSeekerProfilePayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.bio || form.bio.length < 10)
      err.bio = "Bio must be at least 10 characters";
    if (!/^https?:\/\/.+/.test(form.portfolio))
      err.portfolio = "Enter a valid URL";
    if (!form.current_job_title)
      err.current_job_title = "Job title is required";
    if (!form.phone || form.phone.length < 10) err.phone = "Enter valid phone";
    if (!form.location) err.location = "Location is required";
    if (!resumeFile) err.resume = "Resume is required"; // use resumeFile

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("bio", form.bio);
    formData.append("portfolio", form.portfolio);
    formData.append("current_job_title", form.current_job_title);
    formData.append("phone", form.phone);
    formData.append("location", form.location);
    if (resumeFile) formData.append("resume", resumeFile); // use resumeFile

    createAction(formData, {
      onSuccess: () => toast.success("Profile created"),
      onError: (err) =>
        toast.error(getErrorMessage(err, "Creating profile failed")),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Personal Info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-5">
          Personal Information
        </h3>

        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Location</Label>
            <Input
              value={form.location}
              onChange={(e) => field("location", e.target.value)}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Job Title</Label>
            <Input
              value={form.current_job_title}
              onChange={(e) => field("current_job_title", e.target.value)}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {errors.current_job_title && (
              <p className="text-xs text-red-500">{errors.current_job_title}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Portfolio</Label>
            <Input
              value={form.portfolio}
              onChange={(e) => field("portfolio", e.target.value)}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {errors.portfolio && (
              <p className="text-xs text-red-500">{errors.portfolio}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => field("bio", e.target.value)}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {errors.bio && <p className="text-xs text-red-500">{errors.bio}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-500">Resume</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setResumeFile(file);
                if (file) setErrors((prev) => ({ ...prev, resume: "" })); // clear error on pick
              }}
              className="text-sm border-slate-200 focus-visible:ring-violet-400"
            />
            {resumeFile && (
              <p className="text-xs text-slate-400">{resumeFile.name}</p>
            )}
            {errors.resume && (
              <p className="text-xs text-red-500">{errors.resume}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 h-8"
          >
            {isPending ? "Creating.." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;

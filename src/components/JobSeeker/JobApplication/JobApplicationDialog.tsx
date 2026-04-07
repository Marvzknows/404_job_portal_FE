"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Upload,
  X,
  Send,
  Paperclip,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { formatDate, formatSize, getErrorMessage } from "@/helpers/helpers";
import { useGetUserResumeList } from "@/hooks/useResume";
import { ResumeListSkeleton } from "./ResumeListSkeleton";
import { useCreateJobApplication } from "@/hooks/useJobApplication";
import { toast } from "sonner";

type JobApplicationDialogProps = {
  open: boolean;
  onClose: () => void;
  jobTitle?: string;
  companyName?: string;
  jobId: string;
};

const JobApplicationDialog = ({
  open,
  onClose,
  jobTitle = "Full Stack Developer",
  companyName = "Acme Corp",
  jobId,
}: JobApplicationDialogProps) => {
  const { data: userResumes, isLoading: isLoadingResumes } =
    useGetUserResumeList(open);

  const { mutate: createJobApplication, isPending: isCreatingJobApplication } =
    useCreateJobApplication();

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeMode, setResumeMode] = useState<"saved" | "upload">("saved");
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      alert("Only PDF or Word documents are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }
    setUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const isValid =
    coverLetter.trim().length > 0 &&
    (resumeMode === "saved" ? !!selectedResumeId : !!uploadedFile);

  const handleSubmit = () => {
    if (!isValid) return;

    const formData = new FormData();

    formData.append("job_listing_id", jobId);
    formData.append("cover_letter", coverLetter);

    if (resumeMode === "upload" && uploadedFile) {
      formData.append("resume", uploadedFile);
    } else if (resumeMode === "saved" && selectedResumeId) {
      formData.append("resume_id", selectedResumeId);
    }

    createJobApplication(formData, {
      onSuccess: () => {
        toast.success("Application submitted successfully!");
        setCoverLetter("");
        setUploadedFile(null);
        setSelectedResumeId(null);
        setResumeMode("saved");
        onClose();
      },
      onError: (err) => {
        toast.error(
          getErrorMessage(err) ||
            "Failed to submit application. Please try again.",
        );
      },
    });
  };

  const handleOnchangeResumeMode = (mode: "saved" | "upload") => {
    setResumeMode(mode);
    setSelectedResumeId(null);
    setUploadedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-lg p-0 gap-0 border border-slate-200 shadow-xl rounded-2xl overflow-hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 bg-linear-to-br from-violet-50 to-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 shadow-sm">
                <Send className="w-4 h-4 text-white" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900 leading-tight">
                  Apply for {jobTitle}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 mt-0.5">
                  {companyName}
                </DialogDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              Cover Letter
              <span className="text-red-400">*</span>
            </Label>
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit for this role…"
              rows={5}
              className="text-sm resize-none border-slate-200 focus-visible:ring-violet-400 focus-visible:border-violet-400 placeholder:text-slate-400"
            />
            <p className="text-xs text-slate-400 text-right">
              {coverLetter.length} characters
            </p>
          </div>

          <Separator />

          {/* Resume Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-slate-400" />
              Attach Resume
              <span className="text-red-400">*</span>
            </Label>

            <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 gap-1">
              <button
                onClick={() => handleOnchangeResumeMode("saved")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                  resumeMode === "saved"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                My Resumes
              </button>
              <button
                onClick={() => handleOnchangeResumeMode("upload")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                  resumeMode === "upload"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Upload New
              </button>
            </div>

            {resumeMode === "saved" &&
              (isLoadingResumes ? (
                <ResumeListSkeleton count={2} />
              ) : (
                <div className="space-y-2">
                  {userResumes?.data.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">
                        No saved resumes.
                      </p>
                      <button
                        onClick={() => handleOnchangeResumeMode("upload")}
                        className="text-xs text-violet-600 hover:underline mt-1"
                      >
                        Upload one instead
                      </button>
                    </div>
                  ) : (
                    <RadioGroup
                      value={selectedResumeId}
                      onValueChange={setSelectedResumeId}
                      className="space-y-2"
                    >
                      {userResumes?.data.map((resume) => {
                        const isSelected = selectedResumeId === resume.id;
                        return (
                          <label
                            key={resume.id}
                            htmlFor={resume.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "border-violet-400 bg-violet-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/40"
                            }`}
                          >
                            <RadioGroupItem
                              value={resume.id}
                              id={resume.id}
                              className="sr-only"
                            />

                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-violet-600" : "bg-slate-100"
                              }`}
                            >
                              <FileText
                                className={`w-4 h-4 ${
                                  isSelected ? "text-white" : "text-slate-400"
                                }`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">
                                {resume.file_name}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {formatSize(Number(resume.file_size))} ·{" "}
                                {formatDate(resume.created_at)}
                              </p>
                            </div>

                            {/* Selected indicator */}
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                            )}
                          </label>
                        );
                      })}
                    </RadioGroup>
                  )}
                </div>
              ))}

            {/* Upload new */}
            {resumeMode === "upload" && (
              <div className="space-y-2">
                {uploadedFile ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-violet-300 bg-violet-50">
                    <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatSize(uploadedFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 ${
                      isDragging
                        ? "border-violet-500 bg-violet-50 scale-[1.01]"
                        : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/40"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                      <Upload className="w-4 h-4 text-violet-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      Drop your resume here
                    </p>
                    <p className="text-xs text-slate-400">
                      or{" "}
                      <span className="text-violet-600 hover:underline">
                        browse files
                      </span>
                    </p>
                    <p className="text-xs text-slate-400">
                      PDF or Word · Max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isCreatingJobApplication}
              className="border-slate-200 text-slate-600 hover:bg-slate-100 h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!isValid || isCreatingJobApplication}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white gap-1.5 h-8 text-xs min-w-27.5"
            >
              {isCreatingJobApplication ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationDialog;

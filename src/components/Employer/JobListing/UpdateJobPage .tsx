"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useUpdateJobDetails, useViewJobDetails } from "@/hooks/useJob";
import { JobDetailT } from "@/types/JobListing";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import ViewJobDetailsSkeleton from "./ViewJobListing/ViewJobDetailsSkeleton";
import JobDescriptionEditor from "./JobDescriptionEditor";

type UpdateJobFormT = {
  title: string;
  description: string;
  salary_min: string;
  salary_max: string;
  work_setup: string;
  job_type: string;
  location: string;
};

const UpdateJobPage = ({ id }: { id: string }) => {
  const { data, isLoading, refetch } = useViewJobDetails(id);
  const { mutate: upodateMutation, isPending } = useUpdateJobDetails();
  const job: JobDetailT | undefined = data?.data;

  const [resetKey, setResetKey] = useState(0);
  const [form, setForm] = useState<UpdateJobFormT>({
    title: "",
    description: "",
    salary_min: "",
    salary_max: "",
    work_setup: "",
    job_type: "",
    location: "",
  });
  const [errors, setErrors] = useState<Partial<UpdateJobFormT>>({});

  // Populate form once job data loads
  useEffect(() => {
    if (!job) return;
    setForm({
      title: job.title,
      description: job.description ?? "",
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      work_setup: job.work_setup,
      job_type: job.job_type,
      location: job.location,
    });
    setResetKey((k) => k + 1); // re-mount editor with fetched content
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<UpdateJobFormT> = {};

    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.work_setup) newErrors.work_setup = "Work setup is required";
    if (!form.job_type) newErrors.job_type = "Job type is required";

    const minSalary = Number(form.salary_min);
    const maxSalary = Number(form.salary_max);

    if (!form.salary_min) newErrors.salary_min = "Minimum salary is required";
    else if (minSalary < 0)
      newErrors.salary_min = "Minimum salary cannot be negative";

    if (!form.salary_max) newErrors.salary_max = "Maximum salary is required";
    else if (maxSalary < 0)
      newErrors.salary_max = "Maximum salary cannot be negative";

    if (
      !newErrors.salary_min &&
      !newErrors.salary_max &&
      minSalary > maxSalary
    ) {
      newErrors.salary_max =
        "Maximum salary should be greater than minimum salary";
    }

    if (!form.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      salary_min: Number(form.salary_min),
      salary_max: Number(form.salary_max),
    };

    upodateMutation(
      { jobId: id, payload },
      {
        onSuccess: () => {
          refetch();
          toast.success("Updated job details");
        },
        onError: (err) => toast.error(err.message ?? "Updating failed"),
      },
    );
  };

  if (isLoading) return <ViewJobDetailsSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        size="sm"
        className="self-start -ml-2 text-muted-foreground hover:text-violet-700"
        asChild
      >
        <Link href={`/employer/job-listing/${id}`}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to listing
        </Link>
      </Button>

      {job ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border p-6 space-y-6"
        >
          <div className="space-y-1">
            <label className="text-sm font-medium">Job Title</label>
            <Input
              name="title"
              placeholder="e.g. Full Stack Developer"
              value={form.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Minimum Salary</label>
              <Input
                name="salary_min"
                type="number"
                placeholder="₱"
                value={form.salary_min}
                onChange={handleChange}
                className={errors.salary_min ? "border-red-500" : ""}
              />
              {errors.salary_min && (
                <p className="text-red-500 text-sm">{errors.salary_min}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Maximum Salary</label>
              <Input
                name="salary_max"
                type="number"
                placeholder="₱"
                value={form.salary_max}
                onChange={handleChange}
                className={errors.salary_max ? "border-red-500" : ""}
              />
              {errors.salary_max && (
                <p className="text-red-500 text-sm">{errors.salary_max}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Work Setup</label>
              <Select
                key={form.work_setup}
                value={form.work_setup}
                onValueChange={handleSelectChange("work_setup")}
              >
                <SelectTrigger
                  className={`w-full ${errors.work_setup ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select setup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on_site">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              {errors.work_setup && (
                <p className="text-red-500 text-sm">{errors.work_setup}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Job Type</label>
              <Select
                key={form.job_type}
                value={form.job_type}
                onValueChange={handleSelectChange("job_type")}
              >
                <SelectTrigger
                  className={`w-full ${errors.job_type ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.job_type && (
                <p className="text-red-500 text-sm">{errors.job_type}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                placeholder="e.g. Manila, Philippines"
                value={form.location}
                onChange={handleChange}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <JobDescriptionEditor
              key={resetKey}
              value={form.description}
              onChange={(val) => {
                setForm((prev) => ({ ...prev, description: val }));
                setErrors((prev) => ({ ...prev, description: undefined }));
              }}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={isPending}
              className="bg-violet-600 hover:bg-violet-700"
            >
              Update Job Post
              {isPending ? <Loader2 className="animate-spin ml-2" /> : null}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-xl border p-6 text-sm text-muted-foreground">
          Job not found.
        </div>
      )}
    </div>
  );
};

export default UpdateJobPage;

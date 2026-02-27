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
import { useState } from "react";
import JobDescriptionEditor from "./JobDescriptionEditor";

const CreateJobForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    salary_min: "",
    salary_max: "",
    work_setup: "",
    job_type: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

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
    const newErrors: Partial<typeof form> = {};

    // Required fields
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.work_setup) newErrors.work_setup = "Work setup is required";
    if (!form.job_type) newErrors.job_type = "Job type is required";

    // Salary validations
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

    console.log("Submit payload:", payload);
  };

  return (
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
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Work Setup</label>
          <Select
            value={form.work_setup}
            onValueChange={handleSelectChange("work_setup")}
          >
            <SelectTrigger
              className={`w-full ${errors.work_setup ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select setup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onsite">On-site</SelectItem>
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
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
          {errors.job_type && (
            <p className="text-red-500 text-sm">{errors.job_type}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <JobDescriptionEditor
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
        <Button className="bg-violet-600 hover:bg-violet-700">
          Create Job Post
        </Button>
      </div>
    </form>
  );
};

export default CreateJobForm;

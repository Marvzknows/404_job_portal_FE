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
    status: "open",
    salary_min: "",
    salary_max: "",
    work_setup: "",
    job_type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Separate handler for shadcn Select since it returns the value directly
  const handleSelectChange = (name: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      {/* Job Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Job Title</label>
        <Input
          name="title"
          placeholder="e.g. Full Stack Developer"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      {/* Salary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Minimum Salary</label>
          <Input
            name="salary_min"
            type="number"
            placeholder="₱"
            value={form.salary_min}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Maximum Salary</label>
          <Input
            name="salary_max"
            type="number"
            placeholder="₱"
            value={form.salary_max}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Work Setup & Job Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Work Setup</label>
          <Select
            value={form.work_setup}
            onValueChange={handleSelectChange("work_setup")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select setup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Job Type</label>
          <Select
            value={form.job_type}
            onValueChange={handleSelectChange("job_type")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_time">Full Time</SelectItem>
              <SelectItem value="part_time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <JobDescriptionEditor
        value={form.description}
        onChange={(val) => setForm((prev) => ({ ...prev, description: val }))}
      />

      {/* Submit */}
      <div className="flex justify-end">
        <Button className="bg-violet-600 hover:bg-violet-700">
          Create Job Post
        </Button>
      </div>
    </form>
  );
};

export default CreateJobForm;

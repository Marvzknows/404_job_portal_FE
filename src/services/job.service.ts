import api from "@/lib/axios";

export type CreateJobFormT = {
  title: string;
  description: string;
  //   status: string;
  salary_min: number;
  salary_max: number;
  work_setup: string;
  job_type: string;
};

export type EmployerJobListParamsT = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: "created_at" | "title" | "salary_min" | "salary_max";
  sort_dir?: "asc" | "desc";
  job_type?: string;
  status?: string;
};

export type JobListParamsT = {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  job_type?: string;
  work_setup?: string;
};

export type EmployerJobStatus = "open" | "closed";

export const jobService = {
  createJob: async (payload: CreateJobFormT) => {
    const res = await api.post("/employer/jobs", payload);
    return res.data;
  },

  employerJobListApi: async (params?: EmployerJobListParamsT) => {
    const res = await api.get("/employer/jobs/list", { params });
    return res.data;
  },

  viewJobDetails: async (jobId: string) => {
    const res = await api.get(`/employer/jobs/${jobId}`);
    return res.data;
  },

  viewPublicJobDetails: async (jobId: string) => {
    const res = await api.get(`/jobs/${jobId}`);
    return res.data;
  },

  updateEmployerJobListingStatusApi: async (
    jobId: string,
    status: EmployerJobStatus,
  ) => {
    const res = await api.put(`/employer/jobs/${jobId}/status`, { status });
    return res.data;
  },

  updateJobListingDetailsApi: async (
    jobId: string,
    payload: CreateJobFormT,
  ) => {
    const res = await api.put(`/employer/jobs/${jobId}`, payload);
    return res.data;
  },

  getJobListApi: async (params?: JobListParamsT) => {
    const res = await api.get("/jobs/list", { params });
    return res.data;
  },
};

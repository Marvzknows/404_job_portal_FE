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

export const jobService = {
  createJob: async (payload: CreateJobFormT) => {
    const res = await api.post("/employer/jobs", payload);
    return res.data;
  },
};

import api from "@/lib/axios";

export type JobApplicationListParamsT = {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
};

export const jobApplicationService = {
  getJobApplicationListApi: async (params: JobApplicationListParamsT) => {
    const res = await api.get(`/job-application`, { params });
    return res.data;
  },
};

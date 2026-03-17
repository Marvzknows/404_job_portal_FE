import api from "@/lib/axios";
import { ApplicationStatusT } from "@/types/JobApplication";

export type JobApplicationListParamsT = {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
};

export type UpdateApplicationStatusPayloadT = {
  applicationId: string;
  status: ApplicationStatusT;
};

export const jobApplicationService = {
  getJobApplicationListApi: async (params: JobApplicationListParamsT) => {
    const res = await api.get(`/job-application`, { params });
    return res.data;
  },

  getJobApplicationApi: async (jobId: string) => {
    const rest = await api.get(`/job-application/${jobId}`);
    return rest.data;
  },

  updateApplicationApi: async (payload: UpdateApplicationStatusPayloadT) => {
    const res = await api.put(
      `/job-application/${payload.applicationId}/status`,
      { status: payload.status },
    );

    return res.data;
  },
};

import api from "@/lib/axios";
import { ActivityLogActionsT } from "@/types/Dashboard";

export type EmployerDashboardParamsT = {
  page?: number;
  per_page?: number;
  search?: string;
  action?: ActivityLogActionsT;
  date_from?: string;
  date_to?: string;
};

export const dashBoardService = {
  getEmployerActivityLogApi: async (params: EmployerDashboardParamsT) => {
    const res = await api.get(`/activity-log/list`, { params });
    return res.data;
  },
};

export const dashBoardStatsService = {
  getEmployerStatsApi: async () => {
    const res = await api.get("employer/dashboard/stats");
    return res.data;
  },

  getJobSeekerStatsApi: async () => {
    const res = await api.get(`job_seeker/dashboard/stats`);
    return res.data;
  },
};

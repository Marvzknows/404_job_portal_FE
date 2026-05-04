import {
  dashBoardService,
  dashBoardStatsService,
  EmployerDashboardParamsT,
} from "@/services/dashboard.service";
import {
  EmployerDashboardStatsT,
  JobSeekerDashboardStatsT,
  PaginatedEmployerActivityLog,
} from "@/types/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployerActivityLog = (params: EmployerDashboardParamsT) => {
  return useQuery<PaginatedEmployerActivityLog>({
    queryKey: ["employerActivityLog", params],
    queryFn: () => dashBoardService.getEmployerActivityLogApi(params),
  });
};

export const useGetEmployerStats = () => {
  return useQuery<EmployerDashboardStatsT>({
    queryKey: ["employerStats"],
    queryFn: () => dashBoardStatsService.getEmployerStatsApi(),
    refetchInterval: 10000,
  });
};

export const useGetJobSeekerStats = () => {
  return useQuery<JobSeekerDashboardStatsT>({
    queryKey: ["jobSeekerStats"],
    queryFn: () => dashBoardStatsService.getJobSeekerStatsApi(),
    refetchInterval: 10000,
  });
};

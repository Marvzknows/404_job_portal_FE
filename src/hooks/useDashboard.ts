import {
  dashBoardService,
  EmployerDashboardParamsT,
} from "@/services/dashboard.service";
import { PaginatedEmployerActivityLog } from "@/types/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployerActivityLog = (params: EmployerDashboardParamsT) => {
  return useQuery<PaginatedEmployerActivityLog>({
    queryKey: ["employerActivityLog", params],
    queryFn: () => dashBoardService.getEmployerActivityLogApi(params),
  });
};

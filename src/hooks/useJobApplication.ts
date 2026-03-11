import {
  JobApplicationListParamsT,
  jobApplicationService,
} from "@/services/jobApplication.service";
import { PaginatedJobApplicationListT } from "@/types/JobApplication";
import { useQuery } from "@tanstack/react-query";

export const useGetJobApplicationList = (params: JobApplicationListParamsT) => {
  return useQuery<PaginatedJobApplicationListT>({
    queryKey: ["jobApplicationList", params],
    queryFn: () => jobApplicationService.getJobApplicationListApi(params),
  });
};

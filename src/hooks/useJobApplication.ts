import {
  JobApplicationListParamsT,
  jobApplicationService,
} from "@/services/jobApplication.service";
import {
  PaginatedJobApplicationListT,
  ShowJobApplicationT,
} from "@/types/JobApplication";
import { useQuery } from "@tanstack/react-query";

export const useGetJobApplicationList = (params: JobApplicationListParamsT) => {
  return useQuery<PaginatedJobApplicationListT>({
    queryKey: ["jobApplicationList", params],
    queryFn: () => jobApplicationService.getJobApplicationListApi(params),
  });
};

export const useGetJobApplication = (jobId: string) => {
  return useQuery<ShowJobApplicationT>({
    queryKey: ["showJobApplication"],
    queryFn: () => jobApplicationService.getJobApplicationApi(jobId),
  });
};

import { ApiErrorResponse } from "@/lib/axios";
import {
  JobApplicationListParamsT,
  jobApplicationService,
  UpdateApplicationStatusPayloadT,
} from "@/services/jobApplication.service";
import {
  PaginatedJobApplicationListT,
  ShowJobApplicationT,
} from "@/types/JobApplication";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

export const useUpdateApplicationStatus = () => {
  return useMutation<
    void,
    AxiosError<ApiErrorResponse>,
    UpdateApplicationStatusPayloadT
  >({
    mutationFn: jobApplicationService.updateApplicationApi,
  });
};

export const useCreateJobApplication = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, FormData>({
    mutationFn: (formData) =>
      jobApplicationService.createApplicationApi(formData),
  });
};

import { ApiErrorResponse } from "@/lib/axios";
import {
  CreateJobFormT,
  EmployerJobListParamsT,
  jobService,
} from "@/services/job.service";
import { JobDetailResponseT, JobListingListT } from "@/types/JobListing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateJob = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, CreateJobFormT>({
    mutationFn: jobService.createJob,
  });
};

export const useEmployerJobList = (params?: EmployerJobListParamsT) => {
  return useQuery<JobListingListT>({
    queryKey: ["employerJobList", params],
    queryFn: () => jobService.employerJobListApi(params),
  });
};

export const useViewJobDetails = (jobId: string) => {
  return useQuery<JobDetailResponseT>({
    queryKey: ["viewJobDetails", jobId],
    queryFn: () => jobService.viewJobDetails(jobId),
  });
};

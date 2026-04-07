import { ApiErrorResponse } from "@/lib/axios";
import {
  CreateJobFormT,
  EmployerJobListParamsT,
  EmployerJobStatus,
  JobListParamsT,
  jobService,
} from "@/services/job.service";
import { JobDetailResponseT, JobListingListT } from "@/types/JobListing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UpdateJobVariables = {
  jobId: string;
  payload: CreateJobFormT;
};

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

export const useViewPublicJobDetails = (jobId: string) => {
  return useQuery<JobDetailResponseT>({
    queryKey: ["viewPublicJobDetails", jobId],
    queryFn: () => jobService.viewPublicJobDetails(jobId),
  });
};

export const useUpdateEmployerJobListingStatus = () => {
  return useMutation<
    void,
    AxiosError<ApiErrorResponse>,
    { jobId: string; status: EmployerJobStatus }
  >({
    mutationFn: ({ jobId, status }) =>
      jobService.updateEmployerJobListingStatusApi(jobId, status),
  });
};

export const useUpdateJobDetails = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, UpdateJobVariables>({
    mutationFn: ({ jobId, payload }) =>
      jobService.updateJobListingDetailsApi(jobId, payload),
  });
};

export const useGetJobList = (params?: JobListParamsT) => {
  return useQuery<JobListingListT>({
    queryKey: ["jobList", params],
    queryFn: () => jobService.getJobListApi(params),
    refetchInterval: 10000,
  });
};

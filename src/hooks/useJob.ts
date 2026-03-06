import { ApiErrorResponse } from "@/lib/axios";
import { CreateJobFormT, jobService } from "@/services/job.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateJob = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, CreateJobFormT>({
    mutationFn: jobService.createJob,
  });
};

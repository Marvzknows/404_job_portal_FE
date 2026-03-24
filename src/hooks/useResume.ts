import { ApiErrorResponse } from "@/lib/axios";
import { resumeService } from "@/services/resume.service";
import { FilesT } from "@/types/files";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResumeLists = {
  success: boolean;
  message: string;
  data: FilesT[];
};

export const useGetUserResumeList = () => {
  return useQuery<ResumeLists>({
    queryKey: ["userResumeList"],
    queryFn: () => resumeService.userResumesListApi(),
  });
};

export const useDeleteResume = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, { resumeId: string }>({
    mutationFn: ({ resumeId }) => resumeService.deleterResumeApi(resumeId),
  });
};

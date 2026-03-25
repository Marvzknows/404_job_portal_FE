import { ApiErrorResponse } from "@/lib/axios";
import {
  profileService,
  UpdateProfilePayload,
} from "@/services/profile.service";
import { EmployerProfileT } from "@/types/Employer";
import { JobSeekerProfileDataT } from "@/types/JobSeeker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type CreateEmployerProfileResponse = {
  message: string;
  data: {
    id: number;
  };
};

export const useEmployerProfile = (
  id: number | undefined,
  options?: { enabled?: boolean },
) => {
  return useQuery<EmployerProfileT>({
    queryKey: ["employerProfile", id],
    queryFn: () => profileService.getEmployerProfile(id ?? 0),
    enabled: options?.enabled ?? true,
  });
};

export const useCreateEmployerProfile = () => {
  return useMutation<
    CreateEmployerProfileResponse,
    AxiosError<ApiErrorResponse>,
    FormData
  >({
    mutationFn: profileService.createEmployerProfile,
  });
};

export const useUpdateEmployerProfile = (id: number) => {
  return useMutation<void, AxiosError<ApiErrorResponse>, FormData>({
    mutationFn: (data) => profileService.UpdateEmployerProfileApi(id, data),
  });
};

export const useJobSeekerProfile = (
  id: string | undefined,
  options?: { enabled?: boolean },
) => {
  return useQuery<JobSeekerProfileDataT>({
    queryKey: ["jobSeekerProfile", id],
    queryFn: () => profileService.getJobSeekerProfileApi(id ?? ""),
    enabled: options?.enabled ?? true,
  });
};

export const useUpdateProfileAvatar = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, FormData>({
    mutationFn: (formData) => profileService.updateProfileAvatarApi(formData),
  });
};

export const useUpdateJobSeekerProfile = (jobSeekerId: string) => {
  return useMutation<void, AxiosError<ApiErrorResponse>, UpdateProfilePayload>({
    mutationFn: (payload) =>
      profileService.updateJobSeekerProfileApi(payload, jobSeekerId),
  });
};

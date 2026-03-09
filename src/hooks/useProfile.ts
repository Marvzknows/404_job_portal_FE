import { ApiErrorResponse } from "@/lib/axios";
import { profileService } from "@/services/profile.service";
import { EmployerProfileT } from "@/types/Employer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
  return useMutation<void, AxiosError<ApiErrorResponse>, FormData>({
    mutationFn: profileService.createEmployerProfile,
  });
};

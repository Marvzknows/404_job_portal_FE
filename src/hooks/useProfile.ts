import { profileService } from "@/services/profile.service";
import { EmployerProfileT } from "@/types/Employer";
import { useQuery } from "@tanstack/react-query";

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

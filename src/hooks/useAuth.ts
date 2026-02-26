import { authService } from "@/services/auth.service";
import { MeResponseT } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useMe = () => {
  return useQuery<MeResponseT>({
    queryKey: ["me"],
    queryFn: authService.me,
  });
};

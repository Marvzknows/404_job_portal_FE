import { authService } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
  });
};

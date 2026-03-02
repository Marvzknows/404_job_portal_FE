import { ApiErrorResponse } from "@/lib/axios";
import { authService, ChangePasswordForm } from "@/services/auth.service";
import { MeResponseT } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};

export const useMe = () => {
  return useQuery<MeResponseT>({
    queryKey: ["me"],
    queryFn: authService.me,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  });
};

export const useChangePassword = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, ChangePasswordForm>({
    mutationFn: authService.changePassword,
  });
};

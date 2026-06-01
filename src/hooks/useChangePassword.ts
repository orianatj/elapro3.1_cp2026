import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useChangePassword() {
  return useMutation<AxiosResponse<any>, unknown, { password: string; newPassword: string; confirmPassword: string }>({
    mutationFn: (data) => changePassword(data),
  });
}

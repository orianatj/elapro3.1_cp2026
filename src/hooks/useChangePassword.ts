import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, { password: string; newPassword: string; confirmPassword: string }>({
    mutationFn: (data) => changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

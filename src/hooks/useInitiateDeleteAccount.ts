import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initateDeleteAccount } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useInitiateDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (password) => initateDeleteAccount(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

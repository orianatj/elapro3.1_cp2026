import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmDeleteAccount } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useConfirmDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => confirmDeleteAccount(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

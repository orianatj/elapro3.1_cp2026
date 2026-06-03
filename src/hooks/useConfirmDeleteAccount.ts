import { useMutation } from "@tanstack/react-query";
import { confirmDeleteAccount } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useConfirmDeleteAccount() {
  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => confirmDeleteAccount(token)
  });
}

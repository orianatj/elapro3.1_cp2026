import { useMutation } from "@tanstack/react-query";
import { initateDeleteAccount } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useInitiateDeleteAccount() {
  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (password) => initateDeleteAccount(password),
  });
}

import { useMutation } from "@tanstack/react-query";
import { confirmEmailChange } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useConfirmEmailChange() {
  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => confirmEmailChange(token)
  });
}

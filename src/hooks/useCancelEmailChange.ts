import { useMutation } from "@tanstack/react-query";
import { cancelEmailChange } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useCancelEmailChange() {
  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => cancelEmailChange(token),
  });
}

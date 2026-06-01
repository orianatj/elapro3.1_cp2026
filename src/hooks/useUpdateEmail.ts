import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useUpdateEmail() {
  return useMutation<AxiosResponse<any>, unknown, { password: string; emailAddress: string; confirmEmailAddress: string }>({
    mutationFn: (data) => updateEmail(data),
  });
}

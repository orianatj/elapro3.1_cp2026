import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelEmailChange } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useCancelEmailChange() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => cancelEmailChange(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

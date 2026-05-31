import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmEmailChange } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, string>({
    mutationFn: (token) => confirmEmailChange(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

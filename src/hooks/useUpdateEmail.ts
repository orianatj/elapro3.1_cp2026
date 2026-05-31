import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmail } from "../services/userApi";
import type { AxiosResponse } from "axios";

export function useUpdateEmail() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, { password: string; emailAddress: string; confirmEmailAddress: string }>({
    mutationFn: (data) => updateEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

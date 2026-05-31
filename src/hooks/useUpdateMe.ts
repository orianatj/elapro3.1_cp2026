import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../services/userApi";
import type { AxiosResponse } from "axios";
import type { UpdateUserData } from "../types/common/User";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, UpdateUserData>({
    mutationFn: (data) => updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

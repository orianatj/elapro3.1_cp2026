import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotification as updateNotificationApi } from "../services/notificationsApi";

export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: false, 
      });
    },
  });
}
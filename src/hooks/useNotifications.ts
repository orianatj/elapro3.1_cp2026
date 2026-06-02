import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/notificationsApi";

export function useNotifications(page: number) {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getNotifications(page),
  });
}
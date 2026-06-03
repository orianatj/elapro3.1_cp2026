import { api } from "./client";

export const getNotifications = async (page: number) => {
  const res = await api.get(`/notifications/me?page=${page}&limit=10`);
  return res.data;
};

export const updateNotification = async (id: string) => {
  const res = await api.patch(`/notifications/${id}`, {
    read: true,
  });

  return res.data;
};
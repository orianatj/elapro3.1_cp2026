import { api } from "./client";

export type RecentAdminActivity = string | {
  id?: string;
  message?: string;
  action?: string;
  description?: string;
  createdAt?: string;
};

export interface AdminDashboardData {
  totalUsers: number;
  activeSubscriptions: number;

  // Backend document currently spells this as "recentUserActicty"
  recentUserActicty?: RecentAdminActivity[];

  // Keep this too, in case backend fixes the spelling later
  recentUserActivity?: RecentAdminActivity[];

  systemHealth: string;
}

export const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await api.get<AdminDashboardData | { data: AdminDashboardData }>(
    "/admin/dashboard"
  );

  // This handles both possible backend formats:
  // 1. { totalUsers: 10, activeSubscriptions: 3, ... }
  // 2. { data: { totalUsers: 10, activeSubscriptions: 3, ... } }
  if ("data" in response.data && typeof response.data.data === "object") {
    return response.data.data;
  }

  return response.data as AdminDashboardData;
};
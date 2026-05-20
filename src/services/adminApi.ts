import { api } from "./client";

export interface AdminRecentLog {
  logId: string;
  logCreationDate: string;
  logStatus: string;
  logCategory: string;
  logAction: string;
  userId: string | null;
  emailAddress: string | null;
  firstName: string | null;
  lastName: string | null;
  targetUserId: string | null;
  targetUserEmail: string | null;
  targetUserFirstName: string | null;
  targetUserLastName: string | null;
  resourceType: string | null;
  resourceId: string | null;
  requestId: string;
  ipAddress: string;
}

export interface AdminDashboardData {
  dbHealth: string;
  totalUsers: number;
  activeSubscriptions: number;
  recentLogs: AdminRecentLog[];
}

export const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await api.get<{ data: AdminDashboardData }>(
    "/admin/dashboard"
  );

  return response.data.data;
};
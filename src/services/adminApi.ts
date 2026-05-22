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

export interface AdminSubscriptionQuery {
  user_id?: string;
  plan_id?: string;
  pending_plan_id?: string;
  billing_status?: "pending" | "paid" | "failed" | "refunded";
  date_range?: "all" | "7d" | "30d" | "90d" | "6m" | "1y" | "3y";
  sort_by?: "nextBillingDate" | "firstName" | "lastName";
  sort_order?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface AdminSubscriptionItem {
  userId?: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: string | null;

  planId?: string | null;
  planName?: string | null;
  billingPlan?: string | null;

  billingStatus?: string | null;
  subscriptionStatus?: string | null;

  submissionsUsed?: number | null;
  submissionQuota?: number | null;
  remainingSubmissions?: number | null;

  nextBillingDate?: string | null;
  renewalDate?: string | null;
  periodEnd?: string | null;

  lastUpdated?: string | null;
  updatedAt?: string | null;
}

export interface AdminSubscriptionsResponse {
  subscriptions: AdminSubscriptionItem[];
  page: number;
  limit: number;
  total?: number;
}

function normaliseSubscriptionsResponse(raw: any): AdminSubscriptionsResponse {
  const data = raw?.data ?? raw;

  const subscriptions =
    data?.subscriptions ??
    data?.billing ??
    data?.userBilling ??
    data?.items ??
    data?.users ??
    [];

  return {
    subscriptions,
    page: data?.page ?? 1,
    limit: data?.limit ?? 25,
    total: data?.total,
  };
}

export const getAdminSubscriptions = async (
  params: AdminSubscriptionQuery = {}
): Promise<AdminSubscriptionsResponse> => {
  const response = await api.get("/admin/users/billing", {
    params: {
      date_range: params.date_range ?? "30d",
      sort_by: params.sort_by ?? "nextBillingDate",
      sort_order: params.sort_order ?? "desc",
      limit: params.limit ?? 25,
      page: params.page ?? 1,
      billing_status: params.billing_status,
      user_id: params.user_id,
      plan_id: params.plan_id,
      pending_plan_id: params.pending_plan_id,
    },
  });

  return normaliseSubscriptionsResponse(response.data);
};
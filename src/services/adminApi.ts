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

export type AdminLogCategory =
  | "AUTH"
  | "USERS"
  | "BILLING"
  | "SUBMISSIONS"
  | "ADMIN"
  | "SYSTEM";

export type AdminLogStatus = "success" | "failure";

export type AdminLogSortBy =
  | "log_creation_date"
  | "log_status"
  | "log_category"
  | "log_action"
  | "user_id"
  | "target_user_id"
  | "resource_type"
  | "resource_id"
  | "request_id"
  | "ip_address";

export interface AdminLogsQuery {
  userId?: string;
  targetUserId?: string;
  logCategory?: AdminLogCategory;
  logStatus?: AdminLogStatus;
  dateRange?: "all" | "7d" | "30d" | "90d" | "6m" | "1y" | "3y";
  sortBy?: AdminLogSortBy;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface AdminLogItem {
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

export interface AdminLogsResponse {
  logs: AdminLogItem[];
  page: number;
  limit: number;
  total?: number;
}

function normaliseAdminLogsResponse(raw: any): AdminLogsResponse {
  const data = raw?.data ?? raw;

  return {
    logs: data?.logs ?? data?.items ?? [],
    page: data?.page ?? 1,
    limit: data?.limit ?? 25,
    total: data?.total,
  };
}

export const getAdminLogs = async (
  params: AdminLogsQuery = {}
): Promise<AdminLogsResponse> => {
  const response = await api.get("/admin/logs", {
    params: {
      userId: params.userId,
      targetUserId: params.targetUserId,
      logCategory: params.logCategory,
      logStatus: params.logStatus,
      dateRange: params.dateRange ?? "30d",
      sortBy: params.sortBy ?? "log_creation_date",
      sortOrder: params.sortOrder ?? "desc",
      limit: params.limit ?? 25,
      page: params.page ?? 1,
    },
  });

  return normaliseAdminLogsResponse(response.data);
};

export const exportAdminLogs = async (
  params: Omit<AdminLogsQuery, "limit" | "page"> = {}
): Promise<void> => {
  const response = await api.get("/admin/logs/export", {
    params: {
      userId: params.userId,
      targetUserId: params.targetUserId,
      logCategory: params.logCategory,
      logStatus: params.logStatus,
      dateRange: params.dateRange ?? "30d",
      sortBy: params.sortBy ?? "log_creation_date",
      sortOrder: params.sortOrder ?? "desc",
    },
    responseType: "blob",
  });

  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.setAttribute("download", "admin-logs-export.csv");
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};


// ===============================
// Admin Users API
// ===============================

export type AdminUserRole =
  | "admin"
  | "student"
  | "supervisory_teacher"
  | "external_teacher";

export type AdminUserStatus =
  | "pending"
  | "active"
  | "inactive"
  | "suspended"
  | "locked"
  | "pending_deletion"
  | "deleted";

export type AdminDateRange = "all" | "7d" | "30d" | "90d" | "6m" | "1y" | "3y";

export type AdminUserSortBy =
  | "createdAt"
  | "lastLogin"
  | "firstName"
  | "lastName"
  | "accountStatus";

export interface AdminUsersQuery {
  search?: string;
  userRole?: AdminUserRole;
  accountStatus?: AdminUserStatus;
  createdAt?: AdminDateRange;
  sortBy?: AdminUserSortBy;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface AdminUserItem {
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string | null;
  userRole: AdminUserRole;
  accountStatus: AdminUserStatus;
  createdAt?: string | null;
  lastLogin?: string | null;
  lastActive?: string | null;
  emailVerified?: boolean | null;
}

export interface AdminUsersResponse {
  users: AdminUserItem[];
  page: number;
  limit: number;
  total?: number;
}

export interface CreateAdminUserPayload {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string | null;
  userRole: AdminUserRole;
}

export interface UpdateAdminUserPayload {
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  phoneNumber?: string | null;
  userRole?: AdminUserRole | null;
  accountStatus?: AdminUserStatus | null;
  emailVerified?: boolean | null;
  reason: string;
}

interface RawAdminUsersResponse {
  data?: {
    users?: AdminUserItem[];
    items?: AdminUserItem[];
    page?: number;
    limit?: number;
    total?: number;
  };
  users?: AdminUserItem[];
  items?: AdminUserItem[];
  page?: number;
  limit?: number;
  total?: number;
}

interface RawAdminUserResponse {
  data?: {
    user?: AdminUserItem;
  } | AdminUserItem;
  user?: AdminUserItem;
}

function normaliseAdminUsersResponse(
  raw: RawAdminUsersResponse
): AdminUsersResponse {
  const data = raw.data ?? raw;

  return {
    users: data.users ?? data.items ?? [],
    page: data.page ?? 1,
    limit: data.limit ?? 25,
    total: data.total,
  };
}

function normaliseAdminUserResponse(raw: RawAdminUserResponse): AdminUserItem {
  const data = raw.data ?? raw;

  if ("user" in data && data.user) {
    return data.user;
  }

  return data as AdminUserItem;
}

export const getAdminUsers = async (
  params: AdminUsersQuery = {}
): Promise<AdminUsersResponse> => {
  const response = await api.get<RawAdminUsersResponse>("/admin/users", {
    params: {
      search: params.search || undefined,
      userRole: params.userRole,
      accountStatus: params.accountStatus,
      createdAt: params.createdAt ?? "30d",
      sortBy: params.sortBy ?? "createdAt",
      sortOrder: params.sortOrder ?? "desc",
      limit: params.limit ?? 25,
      page: params.page ?? 1,
    },
  });

  return normaliseAdminUsersResponse(response.data);
};

export const createAdminUser = async (
  payload: CreateAdminUserPayload
): Promise<void> => {
  await api.post("/admin/users", payload);
};

export const getAdminUser = async (userId: string): Promise<AdminUserItem> => {
  const response = await api.get<RawAdminUserResponse>(`/admin/users/${userId}`);
  return normaliseAdminUserResponse(response.data);
};

export const updateAdminUser = async (
  userId: string,
  payload: UpdateAdminUserPayload
): Promise<AdminUserItem> => {
  const response = await api.patch<RawAdminUserResponse>(
    `/admin/users/${userId}`,
    payload
  );

  return normaliseAdminUserResponse(response.data);
};

export const deleteAdminUser = async (
  userId: string,
  password: string
): Promise<void> => {
  await api.delete(`/admin/users/${userId}`, {
    data: {
      password,
    },
  });
};

export const exportAdminUsers = async (
  params: Omit<AdminUsersQuery, "limit" | "page"> = {}
): Promise<void> => {
  const response = await api.get("/admin/users/export", {
    params: {
      search: params.search || undefined,
      userRole: params.userRole,
      accountStatus: params.accountStatus,
      createdAt: params.createdAt ?? "30d",
      sortBy: params.sortBy ?? "createdAt",
      sortOrder: params.sortOrder ?? "desc",
    },
    responseType: "blob",
  });

  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.setAttribute("download", "admin-users-export.csv");
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
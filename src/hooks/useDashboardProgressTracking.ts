import { useQuery } from "@tanstack/react-query";
import { api } from "../services/client";

export type DashboardProgressParams = {
  userId?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
  ieltsType?: string | null;
  taskType?: string | null;
};

export type ProgressPoint = {
  label: string;
  completed: number;
  total: number;
  percentage?: number;
  date?: string;
};

export type ProgressSummary = {
  totalSubmissions?: number;
  completedTasks?: number;
  avgScore?: number;
  streakDays?: number;
  improvementRate?: number;
};

export type DashboardProgressResponse = {
  summary?: ProgressSummary;
  timeline?: ProgressPoint[];
  breakdown?: Array<{
    name: string;
    count: number;
    percentage?: number;
  }>;
};

async function fetchDashboardProgressTracking(
  params: DashboardProgressParams
): Promise<DashboardProgressResponse> {

  const response = await api.get(
    "/dashboard/progress-tracking",
    {
      params: {
        user_id: params.userId || undefined,
        from_date: params.fromDate || undefined,
        to_date: params.toDate || undefined,
        ielts_type: params.ieltsType || undefined,
        task_type: params.taskType || undefined,
      },
    }
  );

  console.log("Dashboard response:", response.data);

  return response.data;
}

export function useDashboardProgressTracking(
  params: DashboardProgressParams
) {
  return useQuery({
    queryKey: ["dashboard-progress-tracking", params],
    queryFn: () => fetchDashboardProgressTracking(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}